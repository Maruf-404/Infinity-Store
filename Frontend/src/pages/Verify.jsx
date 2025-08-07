import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axiosInstance from '../config/axios'
import { toast } from 'react-toastify'

const Verify = () => {
   const {token, navigate, setCartItems} = useContext(ShopContext)
   const [searchParams, setSearchParams] = useSearchParams()

   const success = searchParams.get("success")
   const orderId = searchParams.get("orderId")

   const verifyPayment = async() => {
       if (!token) {
        return null
       }
       try {
        const res = await axiosInstance.post("/order/verifystripe", {orderId, success})
        if (res.data.success) {
            setCartItems({})
            navigate("/orders")
            toast.success("Order Placed")
        }else {
            toast.error(res.data.message)
            navigate("/cart")
        }
         
       } catch (error) {
        console.log("Error in verify payment", error);
        
       }

   }

   useEffect(() => {
    verifyPayment()
   }, [token])

  return (
    <div>
      Verify
    </div>
  )
}

export default Verify
