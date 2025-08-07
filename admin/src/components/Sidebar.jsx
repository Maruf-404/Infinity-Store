import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className={"flex items-center gap-3 border border-gray-300 px-3 py-2 border-r-0 rounded-l"} to={"/add-product"}>
             <img className='w-5 h-5' src={assets.add_icon} alt="ADD icon" />
             <p className='hidden sm:block'>Add item</p>
        </NavLink>
           <NavLink className={"flex items-center gap-3 border border-gray-300 px-3 py-2 border-r-0 rounded-l"} to={"/list-products"}>
             <img className='w-5 h-5' src={assets.order_icon} alt="ADD icon" />
                  <p className='hidden sm:block'>List Items</p>
        </NavLink>
           <NavLink className={"flex items-center gap-3 border border-gray-300 px-3 py-2 border-r-0 rounded-l"} to={"/product-orders"}>
             <img className='w-5 h-5' src={assets.order_icon} alt="ADD icon" />
                  <p className='hidden sm:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
