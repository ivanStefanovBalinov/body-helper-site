"use client";
import React from "react";
import { Carousel, Image } from "react-bootstrap";

const HeroCarousel = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <Image src="/carousel-1.jpg" fluid className="carousel-image" />
          <Carousel.Caption>
            <h3>Elevate Your Limits, Embrace Your Potential</h3>
            <p>
              Break free from the confines of your comfort zone and discover the
              untapped possibilities that await on your path to a transformative
              body and mind.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="/carousel-3.jpg" fluid className="carousel-image" />
          <Carousel.Caption>
            <h3>Sculpt Your Future, One Rep at a Time</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="/carousel-2.jpg" fluid className="carousel-image" />
          <Carousel.Caption>
            <h3>"Unleash Your Inner Warrior</h3>
            <p>
              Forge the body you desire and sculpt a future of vitality and
              confidence, rep by rep, as you rewrite the narrative of your own
              physical evolution.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HeroCarousel;
