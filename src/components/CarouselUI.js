import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
    <Carousel className="w-full h-full max-w-xs" setApi={setApi}>
      <CarouselContent className='h-[1060] w-[750]'>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image src={image} width="750" height="1060" alt="Clue of the spacerun game" className="rounded-lg aspect-[1/1.414] object-cover" priority={true} />
          </CarouselItem>
        ))}
      </CarouselContent >
      <div className="flex gap-2 mt-4 justify-center">
        {Array.from({ length: images.length }).map((_, index) => (
          <div className={`w-2 h-2 rounded-full cursor-pointer ${current == index ? "bg-primary" : "bg-muted"}`} key={index} onClick={() => handleCarouselChange(index)} />
        ))}
      </div>
    </Carousel>
  )
}

export default CarouselUI