import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const LastestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lastestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    setLatestCollection(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"Collections"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          provident minus repellendus veritatis,
        </p>
      </div>
      
      <div className="px-4">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"} 
          breakpoints={{
            320: { 
              slidesPerView: 1.2,
              spaceBetween: 20,
              coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
              }
            },
            640: { 
              slidesPerView: 2,
              spaceBetween: 30,
              coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: true
              }
            },
            1024: { 
              slidesPerView: 3,
              spaceBetween: 40,
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
              }
            }
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {lastestCollection.map((item, index) => (
            <SwiperSlide key={index} className="!h-auto pb-8"> 
              <div className="h-full flex items-center justify-center p-2">
                <ProductItem
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  images={item.images}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LastestCollection;