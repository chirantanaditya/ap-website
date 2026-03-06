"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import { Autoplay, EffectCoverflow } from "swiper/modules"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
}) => {
  const css = `
  .swiper {
    width: 100%;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 400px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
    opacity: 0 !important;
  }
  `
  return (
    <section className="w-full">
      <style>{css}</style>
      <div className="relative w-full">
        <Swiper
          spaceBetween={50}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={false}
          navigation={false}
          modules={[EffectCoverflow, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full overflow-hidden rounded-xl">
                <Image
                  src={image.src}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                  alt={image.alt}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
