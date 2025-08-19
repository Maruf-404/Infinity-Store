// ProductItem.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, images }) => {
  return (
    <Link to={`/product/${id}`} className="block">
      <div className="w-full">
        {/* Image wrapper with fixed height */}
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product info */}
        <h3 className="mt-2 text-sm font-medium text-gray-800 truncate">{name}</h3>
        <p className="text-sm font-semibold text-gray-600">₹{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
