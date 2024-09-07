import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import "./viewProduct.css";

const ViewProductSwiper = ({ product }) => {
  return (
    <Swiper
      direction="horizontal"
      loop={true}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[Navigation]}
      className="mySwiper"
    >
      {product?.images.map((image, i) => (
        <SwiperSlide key={i}>
          <img src={image} alt={`Product Image ${i + 1}`} />
        </SwiperSlide>
      ))}

      {/* Optional Navigation Buttons */}
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
};

export default ViewProductSwiper;
