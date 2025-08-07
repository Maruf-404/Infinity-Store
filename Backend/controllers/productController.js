import asyncHandler from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { createProduct } from "../services/productServices.js";
import productModel from "../models/productModel.js";

const addproduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;
  const image1 = req.files.image1 && req?.files?.image1[0];
  const image2 = req.files.image2 && req?.files?.image2[0];
  const image3 = req.files.image3 && req?.files?.image2[0];
  const image4 = req.files.image4 && req?.files?.image4[0];
  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );

  const imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  const productData = {
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    sizes: JSON.parse(sizes),
    bestseller: bestseller === "true" ? true : false,
    images: imagesUrl,
    date: Date.now(),
  };
  const newProduct = await createProduct(productData);

  res.status(200).json({ success: true, message: "Product Added", newProduct });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const allProduct = await productModel.find({});
  res
    .status(200)
    .json({ success: true, message: "Fetched all products", allProduct });
});

const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const deletedProduct = await productModel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ success: true, message: "Product Deleted", deletedProduct });
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.query;

  const singleProduct = await productModel.findById(productId);
  res.status(200).json({
    success: true,
    message: "Product fetched succesfully",
    singleProduct,
  });
});

export { addproduct, getAllProducts, removeProduct, getSingleProduct };
