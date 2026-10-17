import Image, { type StaticImageData } from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ThumbnailProps = { images: (string | StaticImageData)[]; title: string };

export default function Thumbnail({ images, title }: ThumbnailProps) {
  return (
    <Carousel className="project-carousel" aria-label={`${title} screenshots`}>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="project-slide">
              <Image
                src={img}
                height={800}
                width={1200}
                sizes="(max-width: 767px) 85vw, (max-width: 1199px) 80vw, 1050px"
                alt={`${title} screenshot ${index + 1}`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <div className="project-carousel-controls">
          <CarouselPrevious className="static h-9 w-9 translate-y-0 border-border bg-card" />
          <CarouselNext className="static h-9 w-9 translate-y-0 border-border bg-card" />
        </div>
      )}
    </Carousel>
  );
}
