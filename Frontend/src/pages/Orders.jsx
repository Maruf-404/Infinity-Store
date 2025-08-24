import React, { lazy, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../config/axios";

const Title = lazy(() => import("../components/Title"));

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const getUserOrders = async () => {
    const res = await axiosInstance.get("/order/userorders");
    if (res.data.success) {
      let allOrdersItem = [];
      res.data.allOrders.forEach((order) => {
        order.items.forEach((item) => {
          if (order.payment === true) {
            allOrdersItem.push({
              price: item.price,
              images: item.images,
              size: item.size,
              quantity: item.quantity,
              status: order.status,
              paymentMode: order.paymentMode,
              payment: order.payment,
              date: order.date,
            });
          }
        });
      });
      setOrders(allOrdersItem.reverse());
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="border-t pt-16 px-4">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>
      <div>
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-10 sm:w-20"
                  src={item.images[0]}
                  alt="productImage"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency} {item.price}
                    </p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {" "}
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400"> {item.paymentMode}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between ">
                <div className="flex items-center gap-2 ">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="md:textbase text-sm">{item.status}</p>
                </div>
                <button
                  onClick={getUserOrders}
                  className="border px-3 py-1  rounded-sm font-medium "
                >
                  Track order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center font-medium text-xl">No Orders Yet</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
