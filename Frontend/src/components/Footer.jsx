import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 gap-14 text-sm px-4">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod at,
            nam corporis quidem minima numquam unde et odit quas voluptatum iste
            quasi, architecto sint! Totam culpa iusto accusantium? Possim Lorem
            ipsum dolor sit .
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li> Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-478-8735</li>
            <li>contact@infinitystore.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className=" py-5 text-sm text-center">
          Copyright 2025@ infinitystore.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
