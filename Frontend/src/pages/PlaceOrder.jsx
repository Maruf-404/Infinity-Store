import { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
   const [errors, setErrors] = useState({});
  const {
    navigate,
    cartItems,
    setCartItems,
    deliveryFee,
    getCartTotal,
    products,
    profileData,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

   
   

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!profileData?.address) {
    
      if (!formData.street.trim()) {
        newErrors.street = "Street address is required";
        isValid = false;
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
        isValid = false;
      }
      if (!formData.state.trim()) {
        newErrors.state = "State is required";
        isValid = false;
      }
      if (!formData.zipcode.trim()) {
        newErrors.zipcode = "Zipcode is required";
        isValid = false;
      }
      if (!formData.country.trim()) {
        newErrors.country = "Country is required";
        isValid = false;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
        isValid = false;
      } else if (!/^\d{10,15}$/.test(formData.phone)) {
        newErrors.phone = "Invalid phone number";
        isValid = false;
      }
    }


    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      isValid = false;
    }

    setErrors(newErrors);
    for(let err in newErrors){
      toast.error(newErrors[err])
    }
    return isValid;
  };


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const initpay = async (order) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_SECRET_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Order Name",
        description: "Order Description",
        order_id: order.id, 
        handler: async (response) => {
          console.log("Payment successful", response);
          try {
            const { data } = await axiosInstance.post(
              "/order/verifyRazorpay",
              response
            );
            if (data.success) {
              setCartItems({});
              navigate("/orders");
              toast.success("Order Placed");
            }
          } catch (error) {
            console.log("Error in Verify razorpay", error);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    script.onerror = () => {
      console.error("Razorpay SDK failed to load.");
    };

    document.body.appendChild(script);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

 if (!validateForm()) {
      return; 
    }

    try {
      const orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              const item = {
                productId: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
                size: size,
                quantity: quantity,
              };
              orderItems.push(item);
            }
          }
        }
      }

      const orderData = {
        address: profileData.address ? profileData.address : formData,
        items: orderItems,
        amount: getCartTotal() + deliveryFee,
      };
      switch (method) {
        case "cod": {
          const res = await axiosInstance.post("/order/place", orderData);
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Order Placed");
          }

          break;
        }
        case "stripe": {
          const stripeRes = await axiosInstance.post(
            "/order/stripe",
            orderData
          );
          if (stripeRes.data.success) {
            const { session_url } = stripeRes.data;
            window.location.replace(session_url);
          } else {
            toast.error(stripeRes.data.message);
          }

          break;
        }
        case "razorpay": {
          const razorpayRes = await axiosInstance.post(
            "/order/razorpay",
            orderData
          );
          if (razorpayRes.data.success) {
            initpay(razorpayRes.data.order);
          }

          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("Error in order placed", error);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 border-t min-h-[80vh] "
    >
      {/* Left side */}
      <div className="pt-7">
        <p>
          <b>Delivery Addresses</b>
        </p>

        {!profileData?.address ? (
          <div>
            <input
              onChange={(e) => onChangeHandler(e)}
              name="street"
              className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
              type="text"
              placeholder="Street"
            />
              <input
                onChange={(e) => onChangeHandler(e)}
                name="phone"
                className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                type="text"
                placeholder="Phone Number"
              />
            <div className="flex gap-3">
              <input
                onChange={(e) => onChangeHandler(e)}
                name="city"
                className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                type="text"
                placeholder="City"
              />
              <input
                onChange={(e) => onChangeHandler(e)}
                name="state"
                className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="flex gap-3">
              <input
                onChange={(e) => onChangeHandler(e)}
                name="zipcode"
                className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                type="text"
                placeholder="Zipcode"
              />
              <input
                onChange={(e) => onChangeHandler(e)}
                name="country"
                className="border border-gray-300 px-3.5 py-1.5 w-full rounded"
                type="text"
                placeholder="Country"
              />
            
            </div>
          </div>
        ) : (
          <div className="flex flex-row pt-3 gap-4 text-gray-600">
            <img src={assets.address_icon} className="w-6 h-6 pt-1" alt="" />
            <p>
              <b>{profileData.name}</b> <br />
              {profileData.address.phone} <br />
              {profileData?.address?.street}, {profileData?.address?.city}{" "}
              <br /> {profileData?.address?.state},{" "}
              {profileData?.address?.country}, {profileData?.address?.zipcode}
            </p>
          </div>
        )}
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />

          <div className="flex flex-col lg:flex-row gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt="StripeLogo"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="StripeLogo"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 textsm mx-4 font-medium">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="text-white bg-black px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
