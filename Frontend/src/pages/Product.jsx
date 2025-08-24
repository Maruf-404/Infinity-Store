import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

const RelatedProducts = lazy(() => import("../components/RelatedProducts"));
const Loader = lazy(() => import("../components/Loader"));

const Product = () => {
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);

  const getProduct = async () => {
    try {
      const res = await axiosInstance.get("/product/single", {
        params: { productId },
      });
      if (res.data.success) {
        setProductData(res.data.singleProduct);
        setImage(res.data.singleProduct.images[0]);
      }
    } catch (error) {
      console.log("Error in get single product", error);
    }
  };

  const handleBuy = () => {
    if (size.length > 0) {
      addToCart(productData._id, size);
      navigate("/place-order");
    } else {
      toast.error("Please select the size");
    }
  };

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, [products, productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-[7vw]">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* Product data */}
        <div className="flex-1 flex flex-row gap-3 sm:gap-1 sm:flex-row">
          {/* Product Images */}
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-[20%] ">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[100%] sm:w-full flex-shrink-0 sm:mb-3 cursor-pointer"
                alt="productImages"
              />
            ))}
          </div>
          <div className="sm:w-[70%]">
            <img src={image} className="w-full h-auto" alt="productImage" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="startIcon" />
            <img src={assets.star_icon} className="w-3 5" alt="startIcon" />
            <img src={assets.star_icon} className="w-3 5" alt="startIcon" />
            <img src={assets.star_icon} className="w-3 5" alt="startIcon" />
            <img
              src={assets.star_dull_icon}
              className="w-3 5"
              alt="DullstartIcon"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-2 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`px-4 py-2 border bg-gray-100 ${
                    item == size ? "bg-gray-400" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleBuy()}
              className="px-8 py-3 text-sm bg-black text-white active:bg-gray-500"
            >
              Buy Now
            </button>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="px-8 py-3 text-sm bg-black text-white active:bg-gray-500"
            >
              Add to Cart
            </button>
          </div>
          <hr className="mt-8 md:w-3/4" />
          <div className="flex flex-col text-sm text-gray-600 gap-1 mt-4 font-semibold">
            <p>Cash on Delivery</p>
            <p>Easy retun and exchnage policy available on this product</p>
            <p>100% original product</p>
          </div>
        </div>
      </div>
      {/* Descriptiopn and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-gray-500 text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            earum dignissimos animi! Sunt repellendus magni, incidunt voluptas
            quisquam ex, quia rerum sint porro corporis praesentium distinctio.
            Facere, cumque. Quia, quam! Sequi et sapiente dicta optio voluptate
            cumque numquam nisi quas id fugiat nihil suscipit ab deleniti
            voluptas delectus maxime libero vel rerum veritatis, quisquam
            molestias hic repellat ut minima? Temporibus. Repellat id aliquid
            numquam cupiditate libero totam, neque dignissimos quae cumque sint
            sit dolorem. Ratione similique nulla non temporibus molestiae
            voluptatibus dolor. Alias vitae quam culpa aperiam incidunt, odio
            temporibus. Consequuntur eligendi sunt et dolore? Libero dolore
            laboriosam iusto exercitationem nobis accusantium mollitia. Possimus
            adipisci autem natus. Velit veritatis temporibus ipsam
            exercitationem pariatur, aperiam est repellat necessitatibus
            voluptates repellendus. Repellendus? Labore iste vero quisquam porro
            illo atque fugit dignissimos officiis, hic vitae numquam itaque,
            exercitationem ullam, enim nesciunt debitis quasi nam dolorum
            accusamus laboriosam odio ab nihil voluptatem veritatis! Explicabo.
          </p>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </Suspense>
    </div>
  ) : (
    <div className="h-screen">
      <Loader />
    </div>
  );
};

export default Product;
