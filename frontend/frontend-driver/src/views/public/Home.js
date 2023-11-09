import React, { useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import img1 from "../../assets/images/home_1.jpeg";
import img2 from "../../assets/images/home_2.jpeg";
import img3 from "../../assets/images/home_3.jpeg";
import { CContainer } from "@coreui/react";

const data = [
  {
    id: 1,
    name: "IMG1",
    img: img1,
  },
  {
    id: 2,
    name: "IMG2",
    img: img2,
  },
  {
    id: 3,
    name: "IMG3",
    img: img3,
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <CContainer className="my-3">
        <h1 className="display-6 text-center" style={{ fontWeight: "bold" }}>
        Welcome to the Taxi Hailing App
        </h1>
        <br />
        <Carousel activeIndex={activeIndex} images={data} setActiveIndex={setActiveIndex} />
      </CContainer>
    </div>
  );
}

export default Home;