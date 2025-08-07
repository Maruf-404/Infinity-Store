import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext'
import Loader from '../components/Loader'

const Home = () => {
   const { products } = useContext(ShopContext);
  return (
    <div>
      <Hero />
      {products.length > 0 ? (
        <>
          {" "}
          <LastestCollection />
          <BestSeller />
        </>
      ) : (
        <Loader />
      )}
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
