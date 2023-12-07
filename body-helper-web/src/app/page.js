import HeroCarousel from "@/components/HeroCarousel";
import { useSession } from "next-auth/react";

import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function Home() {
  const firstSectionContent = [
    {
      title: "Fueling Performance with Nutrient-Rich Meals",
      text: "Enhance your fitness journey by nourishing your body with nutrient-dense meals. Prioritize a balance of lean proteins, complex carbs, and veggies. This synergy of nutrition supports muscle growth, sustained energy, and optimal performance during both weightlifting and cardio workouts.",
    },
    {
      title: "Strategic Meal Timing for Workouts",
      text: "Optimize your workout sessions by strategically timing your meals. Consume a mix of protein and carbs before weightlifting for strength, and prioritize post-cardio meals to replenish energy stores. This tailored approach ensures sustained endurance and efficient recovery.",
    },
    {
      title: "Strength through Weightlifting, Endurance through Cardio",
      text: "Incorporate a well-rounded fitness routine with a mix of weightlifting and cardio. Weightlifting builds muscle and boosts metabolism, while cardio enhances endurance and burns calories. Together, they create a powerful synergy for a comprehensive and effective body transformation.",
    },
    {
      title: "Strength through Weightlifting, Endurance through Cardio",
      text: "Customize your fitness routine based on how your body responds to weightlifting and cardio. Adjust intensity, duration, and type of exercises to suit your goals and individual needs. This adaptability ensures a sustainable and personalized path to a healthier, fitter you.",
    },
  ];

  const orderedListData = [
    {
      strong: "Personalized Plans:",
      text: "Benefit from custom-tailored workout routines and meal plans that adapt to your fitness level, preferences, and goals. Your journey is unique, and so is our approach.",
    },
    {
      strong: "Expert Guidance:",
      text: "Our team of experienced fitness and nutrition experts is here to guide you every step of the way. From form correction to dietary advice, you'll have the support you need to achieve your goals.",
    },
    {
      strong: "Versatile Workouts:",
      text: "Enjoy a variety of workouts, including dynamic weightlifting sessions to build strength and cardio routines for endurance. Our diverse range of exercises keeps your routine exciting and effective.",
    },
    {
      strong: "Nutrient-Rich Meals:",
      text: "Say goodbye to bland diets. Our meal plans are not only nutritious but also delicious. We believe in the power of enjoying what you eat while nourishing your body.",
    },
    {
      strong: "Track Your Progress:",
      text: "Stay motivated by tracking your progress seamlessly within the your personal table and calculator. Celebrate milestones, set new goals, and witness the positive changes happening in your body and mind.",
    },
  ];

  return (
    <>
      <section className="hero-section-home">
        <HeroCarousel />
      </section>
      <main>
        <section className="dark-bg">
          <Container>
            <Row>
              <h1 className="section-main-header">
                Integrated Fitness Blueprint: Nutrition, Weightlifting, and
                Cardio Mastery.
              </h1>
              {firstSectionContent.map((column, index) => (
                <Col md={6} className="my-2" key={index + 1}>
                  <h5>{column.title}</h5>
                  <p>{column.text}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <h1 className="section-main-header">
              Transform Your Life: Join Our Fitness Revolution
            </h1>
            <Row>
              <Col md={6}>
                <p>
                  Are you ready to embark on a transformative journey towards a
                  healthier, stronger, and more confident version of yourself?
                  Our cutting-edge web app combines personalized training
                  programs and meticulously crafted meal plans to revolutionize
                  the way you approach fitness. From tailored workouts that suit
                  your fitness level to delicious meal options that align with
                  your goals, our platform is designed to make your fitness
                  journey seamless and effective.
                </p>

                <h4>Here's why you should join us:</h4>
                <ol>
                  {orderedListData.map((li, index) => (
                    <li key={index + 1}>
                      <strong>{li.strong}</strong>
                      {li.text}
                    </li>
                  ))}
                </ol>
                <h5>
                  Are you ready to revolutionize your fitness journey? Join us
                  and take the first step towards a healthier, happier you.
                  Let's transform together!
                </h5>
                <Button variant="dark" size="lg" className="my-3">
                  Sing In
                </Button>
              </Col>
              <Col md={6}>
                <Image src="/sign-section-cutted.png" fluid alt="fit-man" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="dark-bg">
          <h1 className="section-main-header">Latest Posts</h1>
        </section>
      </main>
    </>
  );
}
