import React from 'react'
import {assets} from "../assets/assets"
import { useAuth } from '../context/AuthContext'

const AdminNavbar = () => {
  const {logout} = useAuth()
  return (
    <div className='flex items-center justify-between py-2 px-[4%] '>
      <img className='w-[max(10%,80px)]' src={assets.adminLogo} alt="Logo" />
      <button onClick={() => logout()} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm rounded-full' >Logout</button>
    </div>
  )
}

export default AdminNavbar
