import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const About = () => {
  const socials = [
    { icon: <FaFacebook />, link: "/" },
    { icon: <FaLinkedin />, link: "/" },
    { icon: <FaSquareXTwitter />, link: "/" },
    { icon: <FaInstagramSquare />, link: "/" },
    { icon: <FaTiktok />, link: "/" },
  ];
  return (
    <>
      <Container>
        <div className="hero-section">
          <Image src="/about-hero.jpg" alt="About photo" fill />
          <h2>About us</h2>
        </div>
        <Row className="my-5">
          <Col>
            <h2>Our Mission to Transform Lives</h2>
            <p>
              At Body Helper, our mission is to transform lives through the
              power of fitness and nutrition. We believe that everyone deserves
              the opportunity to achieve a better body and elevate their health
              status. Our journey began with a simple yet profound vision: to
              create a supportive space where individuals of all backgrounds and
              fitness levels can embark on a transformative wellness journey.
            </p>
            <p>
              We understand that achieving a better body is not just about
              appearances; it's about fostering a healthier, more resilient you.
              With a focus on holistic well-being, we strive to shape positive
              nutrition behaviors that contribute to long-term health. It's not
              just a goal; it's a commitment to your lasting vitality.
            </p>
          </Col>
          <Col>
            <div className="about-img-wrapper">
              <Image src="/about-1.jpg" alt="About photo" fill />
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <div className="about-img-wrapper-xl">
              <Image src="/about-2.jpg" alt="About photo" fill />
            </div>
          </Col>
          <Col>
            <h2>Tools for Your Wellness Journey</h2>
            <p>
              "At Body Helper, we go beyond aspirations – we provide tangible
              tools to help you succeed on your wellness journey. Our
              comprehensive suite of resources includes a powerful nutrition
              calculator, designed to demystify the complexities of a balanced
              diet. Whether you're a fitness enthusiast or just starting, our
              nutrition calculator is your personalized guide to optimal health.
            </p>
            <p>
              Explore our curated table of nutrition plan recipes, crafted to
              suit various tastes and dietary preferences. We believe that
              enjoying the journey is as crucial as reaching the destination,
              and our recipes are designed to make healthy eating delicious and
              accessible
            </p>
            <p>
              Delve into our informative articles, where our experts share
              valuable insights on fitness, nutrition, and overall well-being.
              We believe that education is key to sustained success, and our
              articles are crafted to empower you with the knowledge needed to
              make informed and beneficial lifestyle choices.
            </p>
            <p>
              Join us at Body Helper, where we're not just shaping bodies; we're
              transforming lives by making health and wellness an achievable and
              enjoyable reality for everyone
            </p>
          </Col>
        </Row>
        <Row className="my-5">
          <h2 style={{ textAlign: "center" }}>Join our social networks</h2>
          {socials.map((item, index) => (
            <Col key={index + 1} className="social-links">
              <a href={item.link}>{item.icon}</a>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default About;
