import { Product } from "../Models/ProductModel.js";
import AsyncErrors from "../Middlewares/AsyncErrors.js";

const createProduct = AsyncErrors(async (req, res) => {
  const thumbnailFile = req.files?.thumbnail?.[0];

  const imageFiles = req.files?.images || [];

  if (!thumbnailFile) {
    return res.status(400).json({
      success: false,
      message: "Thumbnail image is required",
    });
  }

  // Product images required
  if (imageFiles.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one product image is required",
    });
  }

  const thumbnail = thumbnailFile.path;

  const images = imageFiles.map((file) => file.path);

  const thumbnailPublicId = thumbnailFile.filename;

  const imagePublicIds = imageFiles.map((file) => file.filename);

  const coating = Array.isArray(req.body.coating)
    ? req.body.coating
    : req.body.coating
      ? [req.body.coating]
      : [];

  const keywords = Array.isArray(req.body.keywords)
    ? req.body.keywords
    : req.body.keywords
      ? [req.body.keywords]
      : [];

  const product = await Product.create({
    // Basic Information
    productName: req.body.productName,
    brand: req.body.brand,
    category: req.body.category,
    subCategory: req.body.subCategory,
    gender: req.body.gender,

    productCode: req.body.productCode,
    description: req.body.description,

    // Frame
    frameType: req.body.frameType,
    frameShape: req.body.frameShape,
    frameMaterial: req.body.frameMaterial,
    frameColor: req.body.frameColor,
    rimType: req.body.rimType,

    // Lens
    lensType: req.body.lensType,
    lensMaterial: req.body.lensMaterial,
    lensColor: req.body.lensColor,

    coating,

    uvProtection: req.body.uvProtection === "true",

    blueLightProtection: req.body.blueLightProtection === "true",

    // Dimensions
    frameWidth: Number(req.body.frameWidth),
    lensWidth: Number(req.body.lensWidth),
    bridgeWidth: Number(req.body.bridgeWidth),
    templeLength: Number(req.body.templeLength),

    // Price
    mrp: Number(req.body.mrp),
    sellingPrice: Number(req.body.sellingPrice),

    // Inventory
    sku: req.body.sku,
    stock: Number(req.body.stock),

    // Images
    thumbnail,
    thumbnailPublicId,

    images,
    imagePublicIds,

    // Rating
    rating: Number(req.body.rating),
    reviewCount: Number(req.body.reviewCount),

    // Flags
    isFeatured: req.body.isFeatured === "true",
    isBestSeller: req.body.isBestSeller === "true",
    isNewArrival: req.body.isNewArrival === "true",
    isActive: req.body.isActive === "true",

    // SEO
    slug: req.body.slug,
    metaTitle: req.body.metaTitle,
    metaDescription: req.body.metaDescription,

    keywords,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// /api/products/:id
const getSingleProduct = AsyncErrors(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// /api/products/
const getAllProduct = AsyncErrors(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);

  const totalProducts = await Product.countDocuments();

  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    success: true,
    count: products.length,
    totalProducts,
    totalPages,
    currentPage: page,
    limit,
    products,
  });
});

const updateProduct = AsyncErrors(async (req, res) => {
  const { id } = req.params;

  const updateData = {
    ...req.body,
  };

  // Check if MRP and sellingPrice are being updated
  if (updateData.mrp !== undefined && updateData.sellingPrice !== undefined) {
    if (updateData.sellingPrice > updateData.mrp) {
      return res.status(400).json({
        success: false,
        message: "Selling price cannot be greater than MRP",
      });
    }

    // Calculate discount
    updateData.discount = Math.round(
      ((updateData.mrp - updateData.sellingPrice) / updateData.mrp) * 100,
    );
  }

  // Update stock status
  if (updateData.stock !== undefined) {
    updateData.stockStatus =
      Number(updateData.stock) > 0 ? "IN STOCK" : "OUT OF STOCK";
  }

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

const deleteProduct = AsyncErrors(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});

const getProductById = AsyncErrors(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOne({
    productCode: productId,
    isActive: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

const searchProducts = AsyncErrors(async (req, res) => {
  const {
    keyword,
    category,
    gender,
    brand,
    frameShape,
    frameMaterial,
    frameColor,
    lensType,
    minPrice,
    maxPrice,
    uvProtection,
    blueLightProtection,
    isFeatured,
    isBestSeller,
    isNewArrival,
    sort,
    page = 1,
    limit = 10,
  } = req.query;

  const currentPage = Math.max(Number(page) || 1, 1);
  const productsPerPage = Math.min(Number(limit) || 10, 50);

  const skip = (currentPage - 1) * productsPerPage;

  const filter = {
    isActive: true,
  };

  // Search
  if (keyword) {
    filter.$or = [
      { productName: { $regex: keyword, $options: "i" } },
      { brand: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { subCategory: { $regex: keyword, $options: "i" } },
      { frameShape: { $regex: keyword, $options: "i" } },
      { frameColor: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  // Category
  if (category) {
    filter.category = category.toUpperCase();
  }

  // Gender
  if (gender) {
    filter.gender = gender.toUpperCase();
  }

  // Brand
  if (brand) {
    filter.brand = {
      $regex: brand,
      $options: "i",
    };
  }

  // Frame Shape
  if (frameShape) {
    filter.frameShape = frameShape.toUpperCase();
  }

  // Frame Material
  if (frameMaterial) {
    filter.frameMaterial = {
      $regex: frameMaterial,
      $options: "i",
    };
  }

  // Frame Color
  if (frameColor) {
    filter.frameColor = {
      $regex: frameColor,
      $options: "i",
    };
  }

  // Lens Type
  if (lensType) {
    filter.lensType = {
      $regex: lensType,
      $options: "i",
    };
  }

  // Price Range
  if (minPrice || maxPrice) {
    filter.sellingPrice = {};

    if (minPrice) {
      filter.sellingPrice.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.sellingPrice.$lte = Number(maxPrice);
    }
  }

  // UV Protection
  if (uvProtection !== undefined) {
    filter.uvProtection = uvProtection === "true";
  }

  // Blue Light Protection
  if (blueLightProtection !== undefined) {
    filter.blueLightProtection = blueLightProtection === "true";
  }

  // Featured
  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured === "true";
  }

  // Best Seller
  if (isBestSeller !== undefined) {
    filter.isBestSeller = isBestSeller === "true";
  }

  // New Arrival
  if (isNewArrival !== undefined) {
    filter.isNewArrival = isNewArrival === "true";
  }

  // Sorting
  let sortOption = {};

  switch (sort) {
    case "price-low":
      sortOption.sellingPrice = 1;
      break;

    case "price-high":
      sortOption.sellingPrice = -1;
      break;

    case "rating":
      sortOption.rating = -1;
      break;

    case "newest":
      sortOption.createdAt = -1;
      break;

    case "oldest":
      sortOption.createdAt = 1;
      break;

    case "popular":
      sortOption.reviewCount = -1;
      break;

    default:
      sortOption.createdAt = -1;
  }

  const [products, totalProducts] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(productsPerPage),

    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  res.status(200).json({
    success: true,
    count: products.length,
    totalProducts,
    totalPages,
    currentPage,
    limit: productsPerPage,
    products,
  });
});

export {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProducts,
};
