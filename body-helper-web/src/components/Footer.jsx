import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { logo } from "../../public/images/body-helper-logo.png";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navItems = [
    { path: "/recipes", title: "Recipes" },
    { path: "/nutrientcalculator", title: "Nutrient Calculator" },
    { path: "/blog", title: "Blog" },
    { path: "/about", title: "About Us" },
  ];

  const socials = [
    { icon: <FaFacebook />, link: "/" },
    { icon: <FaLinkedin />, link: "/" },
    { icon: <FaSquareXTwitter />, link: "/" },
    { icon: <FaInstagramSquare />, link: "/" },
    { icon: <FaTiktok />, link: "/" },
  ];

  const currentYear = new Date().getFullYear();
  return (
    <footer className="dark-bg mt-3">
      <Container>
        <Row className="py-3 mt-3">
          <Col md={2}>
            <div>
              <Image
                src="/images/body-helper-logo.png"
                height={120}
                width={170}
              />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <p>
                In 2023, I launched the "Body Helper" blog on Tumblr, dedicated
                to sharing a blend of nutritious recipes and effective training
                routines. The platform also features a handy calorie calculator,
                providing an all-encompassing resource for individuals seeking a
                balanced approach to health and fitness.
              </p>
            </div>
          </Col>
          <Col md={2}>
            <ul className="footer-ul">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link href={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={1}>
            <h4>Socials</h4>{" "}
            <ul className="footer-socials">
              {socials.map((social, index) => (
                <li key={index + 1}>
                  <Link href={social.link}>{social.icon}</Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 ">
            <p>Body-Helper &copy; {currentYear} Developed by Ivan Balinov</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
