import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const ProductOrders = () => {
  const [orders, setOrders] = useState([]);
  const { currency } = useAuth();


  const getAllOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/all");
      console.log(res.data);
      setOrders(res.data.orders.reverse());
    } catch (error) {
      console.log("Error in get all orders", error);
    }
  };

  const statusHandler = async(status, orderId) => {
    try {
      const res = await axiosInstance.put("/order/status", {orderId, status})
      console.log(res);
      
      if (res.data.success) {
        await getAllOrders()
      }
    } catch (error) {
      console.log("Error in update order status", error);
      
    }
  }


  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {orders.map((order, index) => {
          return (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start norder-2 border-gray-200 p-5 md:p-8 my-3 md:m-4 text-xs sm:text-sm text-gray-700  "
              key={index}
            >
              <img
                className="w-12"
                src={assets.parcel_icon}
                alt="parcel icon"
              />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === item.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {" "}
                          {item.name} X {item.quantity} <span>{item.size}</span>{" "}
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {" "}
                          {item.name} X {item.quantity} <span>{item.size}</span>
                          ,{" "}
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  {" "}
                  Items: {order.items.length}
                </p>
                <p className="mt-3">Method: {order.paymentMode}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm sm:text-[15px]">
                <p>
                  {currency}
                  {order.amount}
                </p>
                <select value={order.status} onChange={(e)=> statusHandler(e.target.value, order._id)} className="p-2 font-semibold border rounded">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOrders;
