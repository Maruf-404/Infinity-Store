import React, { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Admin Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigation()
  const { login } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/admin", {
        email,
        password,
      });
      // console.log(res.data.token);
      login(res.data.token);
      toast.success("Admin login successfully");
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-25 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Admin Login</p>
        <hr className="border-none w-8 h-[1.5px] bg-gray-800" />
      </div>

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Email"
        required
        value={email}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Password"
        required
        value={password}
      />
      <div className="flex justify-between w-full mt-[8px]">
        <p className="cursor-pointer">Forget your password</p>
      </div>
      <button className="bg-black text-white px-8 py-2 font-light mt-4">
       Sign In
      </button>
    </form>
  );
};

export default Login;
