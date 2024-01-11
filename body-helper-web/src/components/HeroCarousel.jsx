"use client";
import React from "react";
import { Carousel, Image } from "react-bootstrap";

const HeroCarousel = () => {
  const carouselInfo = [
    {
      image: "/carousel-1.jpg",
      header: "Elevate Your Limits, Embrace Your Potential",
      text: "Break free from the confines of your comfort zone and discover the untapped possibilities that await on your path to a transformative body and mind",
    },
    {
      image: "/carousel-3.jpg",
      header: "Sculpt Your Future, One Rep at a Time",
      text: "Break free from the confines of your comfort zone and discover the untapped possibilities that await on your path to a transformative body and mind",
    },
    {
      image: "/carousel-1.jpg",
      header: "Elevate Your Limits, Embrace Your Potential",
      text: "Break free from the confines of your comfort zone and discover the untapped possibilities that await on your path to a transformative body and mind.",
    },
    {
      image: "/carousel-2.jpg",
      header: "Unleash Your Inner Warrior",
      text: "Forge the body you desire and sculpt a future of vitality and confidence, rep by rep, as you rewrite the narrative of your own physical evolution.",
    },
  ];
  return (
    <>
      <div className="carousel-wrapper">
        <Carousel>
          {carouselInfo.map((item, index) => (
            <Carousel.Item key={index + 1}>
              <Image
                src={item.image}
                fluid
                className="carousel-image"
                alt={item.header}
              />
              <Carousel.Caption>
                <h3>{item.header}</h3>
                <p>{item.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HeroCarousel;
