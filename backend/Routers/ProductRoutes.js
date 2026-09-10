import express from "express";

const router = express.Router();

import {
  getAllProduct,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProducts,
  getProductsByCatAndShape
} from "../Controllers/ProductController.js";

import UploadImages from "../Middlewares/UploadImages.js";

// POST
router.post(
  "/create-product",
  UploadImages.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  createProduct,
);

// GET ALL
router.get("/", getAllProduct);

router.get(
  "/glasses",
  getProductsByCatAndShape
);


// SEARCH
router.get("/search", searchProducts);

// GET BY PRODUCT CODE
router.get("/get-product/:productId", getProductById);

// UPDATE
router.put(
  "/update-product/:id",

  UploadImages.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),

  updateProduct,
);

// DELETE
router.delete("/delete-product/:id", deleteProduct);

// GET BY MONGODB _id
router.get("/:id", getSingleProduct);




export default router;
