import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

var bannerData = [
  {
    id: 1,
    image: require('../../assets/images/home_1.jpeg'),
    title: 'Increase Your Earnings with Flexible Hours',
    description: `Looking to boost your income? Join our driver network and enjoy the flexibility of choosing your own working hours.
      Whether you prefer to drive part-time or full-time, our platform allows you to earn on your terms. Start maximizing your earnings today.`,
    buttonTitle: 'BECOME A DRIVER',
    link: 'https://localhost:3002/driver-registration'
  },
  {
    id: 2,
    image: require('../../assets/images/home_2.jpeg'),
    title: 'Connect with Passengers in Your Area',
    description: `Ready to connect with passengers in your area? Join our driver community and start accepting ride requests from nearby customers.
      With our intuitive app, you can efficiently navigate to pick-up locations and provide a seamless ride experience. Join us and start earning with every trip.`,
    buttonTitle: 'JOIN NOW',
    link: 'https://localhost:3002/driver-login'
  },
  {
    id: 3,
    image: require('../../assets/images/home_3.jpeg'),
    title: 'Advertise Your Business to Passengers',
    description: `Looking to expand your business? Advertise your services to passengers using our platform and reach a wide audience.
      Showcase your offerings to potential customers during their rides and drive traffic to your business. Get started today and grow your clientele.`,
    buttonTitle: 'PLACE AN AD',
    link: 'https://localhost:3002/driver-dashboard'
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