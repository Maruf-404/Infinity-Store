import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axiosInstance from "../config/axios";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate, token, setToken } = useContext(ShopContext);

  const login = async () => {
    const res = await axiosInstance.post("/user/login", {
      email,
      password,
    });
 
    if (res.data.success) {
      setToken(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("User login successfully");
    }
  };

  const guestLogin = async () => {
     try {
          const res = await axiosInstance.post("/user/login", {
      email: "guest@gmail.com",
      password: "guest@dev",
    });
 
    if (res.data.success) {
      setToken(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("User login successfully");
    }
     } catch (error) {
      console.log("Error in guest login", error);
      
     }
  };

  const signup = async () => {
    const res = await axiosInstance.post("/user/register", {
      name,
      email,
      password,
    });
    console.log(res.data);
    
    if (res.data.success) {
      setToken(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("User signup successfully");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Login") {
        await login();
      } else {
        await signup();
      }
    } catch (error) {
      console.log("Error in user authentication", error);
      toast.error(error.response.data.error[0].msg)
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none w-8 h-[1.5px] bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border border-gray-800 px-3 py-2"
          placeholder="Name"
          required
        />
      )}

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
        <p onClick={() => guestLogin()} className="cursor-pointer">Guest Account</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white px-8 py-2 font-light mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
