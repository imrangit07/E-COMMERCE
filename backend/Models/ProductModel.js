import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "EYEGLASSES",
        "SUNGLASSES",
        "CONTACT LENSES",
        "SPECIAL POWER",
        "KIDS",
        "SALE",
      ],
    },

    subCategory: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS"],
    },

    productCode: {
      type: String,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
    },

    // Frame
    frameType: {
      type: String,
    },

    frameShape: {
      type: String,
      enum: [
        "AVIATOR",
        "CAT EYE",
        "CLUBMASTER",
        "GEOMETRIC",
        "RECTANGLE",
        "ROUND",
        "SQUARE",
      ],
    },

    frameMaterial: {
      type: String,
    },

    frameColor: {
      type: String,
    },

    rimType: {
      type: String,
    },

    // Lens
    lensType: {
      type: String,
    },

    lensMaterial: {
      type: String,
    },

    lensColor: {
      type: String,
    },

    coating: {
      type: [String],
      default: [],
    },

    uvProtection: {
      type: Boolean,
      default: false,
    },

    blueLightProtection: {
      type: Boolean,
      default: false,
    },

    // Dimensions
    frameWidth: {
      type: Number,
    },

    lensWidth: {
      type: Number,
    },

    bridgeWidth: {
      type: Number,
    },

    templeLength: {
      type: Number,
    },

    // Price
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Inventory
    sku: {
      type: String,
      unique: true,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    stockStatus: {
      type: String,
      enum: ["IN STOCK", "OUT OF STOCK"],
      default: "IN STOCK",
    },

    // Images
    thumbnail: {
      type: String,
    },

    images: {
      type: [String],
      default: [],
    },

    // Reviews
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Flags
    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // SEO
    slug: {
      type: String,
      unique: true,
      trim: true,
    },

    metaTitle: {
      type: String,
    },

    metaDescription: {
      type: String,
    },

    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export { Product };
