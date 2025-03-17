import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

function CarouselUI({ images = [] }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    })
  }, [api]);

  function handleCarouselChange(index) {
    api.scrollTo(index);
  }

  return (
    <div className="w-full">
      <Carousel className="w-full max-w-md mx-auto" setApi={setApi}>
        <CarouselContent className='h-full w-full'>
          {images.map((image, index) => (
            <CarouselItem key={index} className="overflow-hidden">
              <div className="relative rounded-lg overflow-hidden border-2 border-blue-300/30 shadow-lg">
                <Image
                  src={image}
                  width="750"
                  height="1060"
                  alt={`Treasure map page ${index + 1}`}
                  className="rounded-lg aspect-[1/1.414] object-cover"
                  priority={index === current}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({ length: images.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleCarouselChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index
                ? "bg-accent scale-110 shadow-md shadow-accent/50"
                : "bg-blue-400/30 hover:bg-blue-400/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselUI