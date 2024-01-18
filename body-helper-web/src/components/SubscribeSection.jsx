"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import manCook from "../../public/man-cook.png";
import { IoIosMail } from "react-icons/io";
import Image from "next/image";
import { toast } from "react-toastify";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { email: email };
    await fetch("https://body-helper.vercel.app/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        toast.success("Your subscription was accepted.");
      } else {
        toast.error("Subscription Failed. Please try Again");
      }
    });
    setEmail("");
  };

  return (
    <div className="newsletter">
      <Row>
        <Col md={6}>
          <div>
            <span>Subscribe</span>
            <h2>Join Body Helper Newsletter</h2>
            <div className="newsletter-text">
              Stay in the loop! Sign up for our newsletter to receive the latest
              updates directly to your inbox.
            </div>
            <div>
              <form className="newsletter-from" onSubmit={submitHandler}>
                <div className="newsletter-from-wrapper">
                  <div className="form-icon">
                    <IoIosMail />
                  </div>
                  <div className="form-input">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-input"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="form-button">
                    <button type="submit">Subscribe</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="newsletter-image">
            <Image src={manCook} alt="Man Cook" fill />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubscribeSection;
