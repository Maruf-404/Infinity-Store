import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartTotal, currency, deliveryFee } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"Cart"} text2={"Total"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {currency} {getCartTotal()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>
            {currency} {deliveryFee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency} {getCartTotal() === 0 ? 0 : getCartTotal() + deliveryFee}
            .00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
