import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import Cookie from "js-cookie"

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 10;
  const [search, setSearch] = useState(" ");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState();
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select the size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        const res = await axiosInstance.post("/cart/add", { itemId, size });
        res;
      } catch (error) {
        console.log("Error in add to cart", error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log("error in cart count", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (token) {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
      if (token) {
        try {
          await axiosInstance.put("/cart/update", {
            itemId,
            size,
            quantity,
          });
        } catch (error) {
          console.log("Error in update cart", error);
        }
      }
    }
  };

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log("Error in get cart total", error);
        }
      }
    }

    return totalAmount;
  };

  const getCartData = async () => {
    if (token) {
      try {
        const res = await axiosInstance.get("/cart/get");

        if (res.data.success) {
          setCartItems(res.data.cartData);
        }
      } catch (error) {
        console.log("Error in get cart data", error);
      }
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/all");

      if (res.data.success) {
        setProducts(res.data.allProduct);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in get all products", error);
      toast.error(error.message);
    }
  };

  const getProfile = async () => {
    if (token) {
      try {
        const response = await axiosInstance.get("/user/profile");
        if (response.data.success) {
          setProfileData(response.data.user);
        }
      } catch (error) {
        console.error("Error in get user profile:", error);
      }
    }
  };

  useEffect(() => {
    getAllProducts();
    getProfile();
  }, [token]);

  useEffect(() => {
    if (!token || localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      getCartData();
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartTotal,
    navigate,
    token,
    setToken,
    getProfile,
    profileData,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
