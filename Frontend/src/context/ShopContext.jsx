import { createContext, useEffect, useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";


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
  
  
  const productsLoaded = useRef(false);
  const profileLoaded = useRef(false);

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
        await axiosInstance.post("/cart/add", { itemId, size });
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
    if (!token) return;
    
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    
    try {
      await axiosInstance.put("/cart/update", {
        itemId,
        size,
        quantity,
      });
    } catch (error) {
      console.log("Error in update cart", error);
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

  
  const getCartData = useCallback(async () => {
    if (!token) return;
    
    try {
      const res = await axiosInstance.get("/cart/get");
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.log("Error in get cart data", error);
    }
  }, [token]);


  const getAllProducts = useCallback(async () => {
    if (productsLoaded.current) return; // Prevent multiple calls
    
    try {
      const res = await axiosInstance.get("/product/all");
      if (res.data.success) {
        setProducts(res.data.allProduct);
        productsLoaded.current = true; // Mark as loaded
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error in get all products", error);
      toast.error(error.message);
    }
  }, []);

 
  const getProfile = useCallback(async () => {
    if (!token || profileLoaded.current) return;
    
    try {
      const response = await axiosInstance.get("/user/profile");
      if (response.data.success) {
        setProfileData(response.data.user);
        profileLoaded.current = true; // Mark as loaded
      }
    } catch (error) {
      console.error("Error in get user profile:", error);
    }
  }, [token]);


  useEffect(() => {
    console.log("call");
    
    getAllProducts(); 
  }, []); 

  
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []); 


  useEffect(() => {
    if (token) {
      getProfile();
      getCartData();
    } else {
     
      setProfileData(null);
      profileLoaded.current = false;
    }
  }, [token, getProfile, getCartData]);

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
