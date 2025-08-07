import React from "react";
import { assets } from "../assets/assets";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop
      centerMode={true}
      centerSlidePercentage={100}
      emulateTouch={true}
      interval={1700}
      showThumbs={false}
      useKeyboardArrows={true}
      showArrows={false}
    >
      <div>
        <img
          style={{
            width: "80rem",
            height: "30rem",
            objectFit: "cover",
            backgroundSize: "center",
          }}
          alt="Caraousal 1"
          src={assets.hero_img}
        />
      </div>
      <div>
        <img
          style={{
            width: "80rem",
            height: "30rem",
            objectFit: "cover",
            backgroundSize: "center",
          }}
          alt="Carousel 2"
          src={assets.banner2}
        />
      </div>
      <div>
        <img
          style={{
            width: "80rem",
            height: "30rem",
            objectFit: "cover",
            backgroundSize: "center",
          }}
          alt="Carousel 3"
          src={assets.banner3}
        />
      </div>
    </Carousel>
  );
};

export default Hero;
