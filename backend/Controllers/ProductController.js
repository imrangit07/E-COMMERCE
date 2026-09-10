import { Product } from "../Models/ProductModel.js";
import AsyncErrors from "../Middlewares/AsyncErrors.js";
import cloudinary from "../config/Cloudinary.js";

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

  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const oldThumbnailPublicId =
    existingProduct.thumbnailPublicId;

  const oldImagePublicIds =
    existingProduct.imagePublicIds || [];

  const updateData = {};

  if (req.body.productName !== undefined)
    updateData.productName = req.body.productName;

  if (req.body.brand !== undefined)
    updateData.brand = req.body.brand;

  if (req.body.category !== undefined)
    updateData.category = req.body.category;

  if (req.body.subCategory !== undefined)
    updateData.subCategory = req.body.subCategory;

  if (req.body.gender !== undefined)
    updateData.gender = req.body.gender;

  if (req.body.productCode !== undefined)
    updateData.productCode = req.body.productCode;

  if (req.body.description !== undefined)
    updateData.description = req.body.description;

  if (req.body.frameType !== undefined)
    updateData.frameType = req.body.frameType;

  if (req.body.frameShape !== undefined)
    updateData.frameShape = req.body.frameShape;

  if (req.body.frameMaterial !== undefined)
    updateData.frameMaterial = req.body.frameMaterial;

  if (req.body.frameColor !== undefined)
    updateData.frameColor = req.body.frameColor;

  if (req.body.rimType !== undefined)
    updateData.rimType = req.body.rimType;

  if (req.body.lensType !== undefined)
    updateData.lensType = req.body.lensType;

  if (req.body.lensMaterial !== undefined)
    updateData.lensMaterial = req.body.lensMaterial;

  if (req.body.lensColor !== undefined)
    updateData.lensColor = req.body.lensColor;

  if (req.body.coating !== undefined) {
    updateData.coating = Array.isArray(req.body.coating)
      ? req.body.coating
      : [req.body.coating];
  }

  if (req.body.uvProtection !== undefined)
    updateData.uvProtection =
      req.body.uvProtection === "true";

  if (req.body.blueLightProtection !== undefined)
    updateData.blueLightProtection =
      req.body.blueLightProtection === "true";

  if (req.body.isFeatured !== undefined)
    updateData.isFeatured =
      req.body.isFeatured === "true";

  if (req.body.isBestSeller !== undefined)
    updateData.isBestSeller =
      req.body.isBestSeller === "true";

  if (req.body.isNewArrival !== undefined)
    updateData.isNewArrival =
      req.body.isNewArrival === "true";

  if (req.body.isActive !== undefined)
    updateData.isActive =
      req.body.isActive === "true";

  if (req.body.frameWidth !== undefined)
    updateData.frameWidth =
      Number(req.body.frameWidth);

  if (req.body.lensWidth !== undefined)
    updateData.lensWidth =
      Number(req.body.lensWidth);

  if (req.body.bridgeWidth !== undefined)
    updateData.bridgeWidth =
      Number(req.body.bridgeWidth);

  if (req.body.templeLength !== undefined)
    updateData.templeLength =
      Number(req.body.templeLength);

  if (req.body.mrp !== undefined)
    updateData.mrp = Number(req.body.mrp);

  if (req.body.sellingPrice !== undefined)
    updateData.sellingPrice =
      Number(req.body.sellingPrice);

  if (req.body.sku !== undefined)
    updateData.sku = req.body.sku;

  if (req.body.stock !== undefined) {
    updateData.stock = Number(req.body.stock);

    updateData.stockStatus =
      Number(req.body.stock) > 0
        ? "IN STOCK"
        : "OUT OF STOCK";
  }

  if (req.body.rating !== undefined)
    updateData.rating = Number(req.body.rating);

  if (req.body.reviewCount !== undefined)
    updateData.reviewCount =
      Number(req.body.reviewCount);

  if (req.body.slug !== undefined)
    updateData.slug = req.body.slug;

  if (req.body.metaTitle !== undefined)
    updateData.metaTitle = req.body.metaTitle;

  if (req.body.metaDescription !== undefined)
    updateData.metaDescription =
      req.body.metaDescription;

  if (req.body.keywords !== undefined) {
    updateData.keywords = Array.isArray(
      req.body.keywords
    )
      ? req.body.keywords
      : [req.body.keywords];
  }

  const finalMRP =
    updateData.mrp !== undefined
      ? updateData.mrp
      : existingProduct.mrp;

  const finalSellingPrice =
    updateData.sellingPrice !== undefined
      ? updateData.sellingPrice
      : existingProduct.sellingPrice;

  if (finalMRP <= 0) {
    return res.status(400).json({
      success: false,
      message: "MRP must be greater than 0",
    });
  }

  if (finalSellingPrice < 0) {
    return res.status(400).json({
      success: false,
      message: "Selling price cannot be negative",
    });
  }

  if (finalSellingPrice > finalMRP) {
    return res.status(400).json({
      success: false,
      message: "Selling price cannot be greater than MRP",
    });
  }

  if (
    updateData.mrp !== undefined ||
    updateData.sellingPrice !== undefined
  ) {
    updateData.discount = Math.round(
      ((finalMRP - finalSellingPrice) / finalMRP) * 100
    );
  }

  const newThumbnailFile =
    req.files?.thumbnail?.[0];

  const newImageFiles =
    req.files?.images || [];

  if (newThumbnailFile) {
    updateData.thumbnail =
      newThumbnailFile.path;

    updateData.thumbnailPublicId =
      newThumbnailFile.filename;
  }

  if (newImageFiles.length > 0) {
    updateData.images = newImageFiles.map(
      (file) => file.path
    );

    updateData.imagePublicIds =
      newImageFiles.map(
        (file) => file.filename
      );
  }

  Object.assign(
    existingProduct,
    updateData
  );

  const product =
    await existingProduct.save();

  if (
    newThumbnailFile &&
    oldThumbnailPublicId
  ) {
    await cloudinary.uploader.destroy(
      oldThumbnailPublicId,
      {
        resource_type: "image",
      }
    );
  }

  if (
    newImageFiles.length > 0 &&
    oldImagePublicIds.length > 0
  ) {
    await Promise.all(
      oldImagePublicIds.map(
        (publicId) =>
          cloudinary.uploader.destroy(
            publicId,
            {
              resource_type: "image",
            }
          )
      )
    );
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

const getProductsByCatAndShape = AsyncErrors(async (req, res) => {
  console.log("this is my query", req.query);

  const { category, frameShape } = req.query;

  const filter = {};
  console.log(category);
  console.log(frameShape);

  if (category) {
    filter.category = category;
  }

  if (frameShape) {
    filter.frameShape = frameShape;
  }

  const products = await Product.find(filter);

  res.status(200).json({
    success: true,
    count: products.length,
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
  getProductsByCatAndShape,
};
