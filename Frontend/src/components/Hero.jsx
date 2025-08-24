import { assets } from "../assets/assets";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop
        centerMode={true}
        centerSlidePercentage={100}
        emulateTouch={true}
        interval={4000}
        showThumbs={false}
        useKeyboardArrows={true}
        swipeable={true}
        dynamicHeight={false}
      >
        <div>
          <img
            alt="Featured Collection - Premium Clothing"
            src={assets.hero_img}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width="1280"
            height="480"
            importance="high"
            data-hero="true"
            style={{ display: "block" }}
          />
        </div>
        <div>
          <img
            alt="New Arrivals - Fashion Forward Styles"
            src={assets.banner2}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="1280"
            height="480"
          />
        </div>
        <div>
          <img
            alt="Sale Items - Up to 50% Off"
            src={assets.banner3}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="1280"
            height="480"
          />
        </div>
      </Carousel>
    </>
  );
};

export default Hero;
