import { lazy, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Title = lazy(() => import("../components/Title"));
const ProductItem = lazy(() => import("./ProductItem"));

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-3xl text-center my-8">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts &&
          relatedProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              images={item.images}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
