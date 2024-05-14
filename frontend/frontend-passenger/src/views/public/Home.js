import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

var bannerData = [
  {
    id: 1,
    image: require('../../assets/images/home_1.jpeg'),
    title: 'Enjoy Safe and Convenient Rides',
    description: `Ready to get around town? Discover hassle-free transportation with our reliable ride-hailing service.
      Whether you're commuting to work, heading to the airport, or exploring the city, our drivers are here to provide a comfortable and secure journey.`,
    buttonTitle: 'BOOK A RIDE',
    link: 'http://localhost:3001/login'
  },
  {
    id: 2,
    image: require('../../assets/images/home_2.jpeg'),
    title: 'Discover Affordable Travel Options',
    description: `Looking for budget-friendly transportation? Look no further! Our ride-hailing platform offers competitive fares and transparent pricing.
      Enjoy cost-effective travel without compromising on quality. Book your ride now and experience the convenience of affordable transportation.`,
    buttonTitle: 'EXPLORE OPTIONS',
    link: 'http://localhost:3001/login'
  },
  {
    id: 3,
    image: require('../../assets/images/home_3.jpeg'),
    title: 'Travel with Confidence Anytime, Anywhere',
    description: `Need a ride at any time of the day? Our 24/7 service ensures you can travel with confidence whenever you need it.
      Whether it's a late-night ride home or an early morning airport transfer, our drivers are available around the clock to get you to your destination safely.`,
    buttonTitle: 'BOOK NOW',
    link: 'http://localhost:3001/login'
  }
]

function Home() {
  return (
    <section id='home' className="hero-block mt-0">
            <Carousel>
                {
                    bannerData.map((item) => {
                        return (
                            <Carousel.Item key={item.id}>
                                <img
                                    className="d-block w-100"
                                    src={item.image}
                                    alt={"Slide " + item.id}
                                />
                                <Carousel.Caption>
                                    <h1 style={{ fontSize: '3.5em' }}>{item.title}</h1>
                                    <p>{item.description}</p>
                                    <Link className='btn btn-primary d-none d-sm-inline' to="/login">{item.buttonTitle} <i className="fas fa-chevron-right"></i></Link>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );

                    })
                }

            </Carousel>
        </section>
  );
}

export default Home;