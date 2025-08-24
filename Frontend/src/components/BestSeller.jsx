import { lazy, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Title = lazy(() => import("../components/Title"));
const ProductItem = lazy(() => import("./ProductItem"));

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(10, 15));
  }, [products]);
  return (
    <div className="my-19 px-4">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best"} text2={"Seller"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          provident minus repellendus veritatis,
        </p>
        <p></p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6">
        {bestSeller &&
          bestSeller.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                images={item.images}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BestSeller;
