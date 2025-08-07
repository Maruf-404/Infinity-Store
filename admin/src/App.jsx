import React from 'react'
import { Route, Routes } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import ProductOrders from "./pages/ProductOrders";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login"
import { useAuth } from './context/AuthContext';


const App = () => {
  const {token} = useAuth()


  return (
    <>
    <ToastContainer/>
    <div className="bg-gray-50 min-h-screen">
     {token === ""? <Login/> :  <>
        <AdminNavbar />
        <hr />
        <div className="flex w-full">
          <Sidebar />
          
          <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-2 text-gray-600 text-base">
            <Routes>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/list-products" element={<ListProduct />} />
              <Route path="/product-orders" element={<ProductOrders />} />
            </Routes>
          </div>
        </div>
      </>}
    </div>
    </>
  )
}

export default App
