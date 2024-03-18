import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ThumbnailProps = {
  images: (string | StaticImageData)[];
};

const Thumbnail = ({ images }: ThumbnailProps) => {
  return (
    <Carousel className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image src={img} height="800" width="1200" alt="thumbnail" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default Thumbnail;
