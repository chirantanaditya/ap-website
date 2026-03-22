"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import { Autoplay, EffectCoverflow } from "swiper/modules"

export type CardCarouselImage = {
  src: string
  alt: string
  /** When set, shown as text over the bottom of the slide (same dimensions as plain photo slides) */
  title?: string
}

interface CarouselProps {
  images: CardCarouselImage[]
  autoplayDelay?: number
}

const COVERFLOW_SWIPER_CSS = `
  .card-coverflow-swiper .swiper {
    width: 100%;
  }

  .card-coverflow-swiper .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 400px;
  }

  .card-coverflow-swiper .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-coverflow-swiper .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .card-coverflow-swiper .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }
  .card-coverflow-swiper .swiper-button-prev,
  .card-coverflow-swiper .swiper-button-next {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
    opacity: 0 !important;
  }
`

export type TextCoverflowSlide = {
  heading: string
  items: string[]
}

/** Same coverflow / autoplay as CardCarousel, for text list slides (e.g. food groups) */
export const TextCoverflowCarousel: React.FC<{
  slides: TextCoverflowSlide[]
  autoplayDelay?: number
}> = ({ slides, autoplayDelay = 2500 }) => {
  return (
    <section className="card-coverflow-swiper w-full" aria-label="Tips carousel">
      <style>{COVERFLOW_SWIPER_CSS}</style>
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
          loop={slides.length >= 3}
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
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.heading}-${index}`}>
              <div className="relative w-full h-full overflow-hidden rounded-xl border border-border bg-white shadow-sm flex flex-col p-4 sm:p-5">
                <h3 className="font-heading text-lg font-medium text-text-dark mb-3 pb-2 border-b border-border shrink-0">
                  {slide.heading}
                </h3>
                <ul className="space-y-2.5 font-body text-sm text-text-mid leading-relaxed overflow-y-auto flex-1 min-h-0 pr-1">
                  {slide.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-gold shrink-0 mt-0.5" aria-hidden>
                        ◆
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
}) => {
  const css = COVERFLOW_SWIPER_CSS
  return (
    <section className="card-coverflow-swiper w-full" aria-label="Photo carousel">
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
          loop={images.length >= 3}
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
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                {image.title ? (
                  <>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none"
                      aria-hidden
                    />
                    <p className="absolute inset-x-0 bottom-0 pb-4 px-3 pt-2 font-heading text-lg sm:text-xl text-center text-white font-medium leading-tight drop-shadow-sm">
                      {image.title}
                    </p>
                  </>
                ) : (
                  <Image
                    src={image.src}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                    alt={image.alt}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
