import cloudinary from "../config/Cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "opticart/products",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    resource_type: "image",
  },
});

const UploadImages = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default UploadImages;