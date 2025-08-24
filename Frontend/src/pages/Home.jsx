import { lazy, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Hero = lazy(() => import("../components/Hero"));
const BestSeller = lazy(() => import("../components/BestSeller"));
const OurPolicy = lazy(() => import("../components/OurPolicy"));
const NewsletterBox = lazy(() => import("../components/NewsletterBox"));
const Loader = lazy(() => import("../components/Loader"));
const LatestCollection = lazy(() => import("../components/LatestCollection"));

const Home = () => {
  const { products } = useContext(ShopContext);
  return (
    <div>
      <Hero />
      {products.length > 0 ? (
        <>
          {" "}
          <LatestCollection />
          <BestSeller />
        </>
      ) : (
        <Loader />
      )}
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
