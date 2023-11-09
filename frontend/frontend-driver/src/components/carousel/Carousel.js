import React, { useEffect } from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";

function Carousel(props) {
  useEffect(() => {
    const itemCount = props.images.length;
    const interval = setInterval(() => {
      props.setActiveIndex((prevIndex) => (prevIndex + 1) % itemCount);
    }, 1000); // Change every 1 second

    return () => {
      clearInterval(interval);
    };
  }, [props.images, props.setActiveIndex]);

  return (
    <CCarousel controls indicators activeIndex={props.activeIndex}>
      {props.images.map((item, index) => (
        <CCarouselItem key={item.id}>
          <CImage
            className="d-block rounded-5 align-items-center justify-content-center"
            src={item.img}
            alt={item.id}
            height={400}
            width={800}
            style={{ margin: "auto" }}
          />
        </CCarouselItem>
      ))}
    </CCarousel>
  );
}

export default Carousel;