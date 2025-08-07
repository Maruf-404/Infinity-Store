import productModel from "../models/productModel.js";

export const createProduct = async (productData) => {
  if (!productData) {
    throw new Error("Product data is required");
  }

  const newProduct = await productModel.create(productData);

  return newProduct;
};
