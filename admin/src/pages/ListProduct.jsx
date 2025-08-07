import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
// import { ShopContext } from "../../context/ShopContext";

const ListProduct = () => {
  const [list, setList] = useState([]);
  const { currency } = useAuth()


  const getAllProducts = async () => {


    try {
      const res = await axiosInstance.get("/product/all");
      console.log(res.data.allProduct);
      if (res.data.allProduct) {
        setList(res.data.allProduct);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in get all products", error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axiosInstance.delete("/product/remove", { 
        data: {id}
       });
      if (res.data.success) {
        toast.success(res.data.message);
        await getAllProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in get all products", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <p className="mb-2">All Product List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 text-sm pt-1 px-2 border"
            >
              <img src={item.images[0]} className="w-12" alt="product image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center text-lg cursor-pointer"
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListProduct;
