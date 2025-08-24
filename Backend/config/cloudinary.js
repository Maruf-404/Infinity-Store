import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,

    default_transformations: [
      { fetch_format: "auto" },
      { quality: "auto" },
      { width: "auto:breakpoints" },
    ],
  });
};

export default connectCloudinary;
