import HeroCarousel from "@/components/HeroCarousel";

import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function Home() {
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
              <Col md={6} className="my-2">
                <h5>Fueling Performance with Nutrient-Rich Meals</h5>
                <p>
                  Enhance your fitness journey by nourishing your body with
                  nutrient-dense meals. Prioritize a balance of lean proteins,
                  complex carbs, and veggies. This synergy of nutrition supports
                  muscle growth, sustained energy, and optimal performance
                  during both weightlifting and cardio workouts.
                </p>
              </Col>
              <Col md={6} className="my-2">
                <h5>Strategic Meal Timing for Workouts</h5>
                <p>
                  Optimize your workout sessions by strategically timing your
                  meals. Consume a mix of protein and carbs before weightlifting
                  for strength, and prioritize post-cardio meals to replenish
                  energy stores. This tailored approach ensures sustained
                  endurance and efficient recovery.
                </p>
              </Col>
              <Col md={6} className="my-2">
                <h5>
                  Strength through Weightlifting, Endurance through Cardio
                </h5>
                <p>
                  Incorporate a well-rounded fitness routine with a mix of
                  weightlifting and cardio. Weightlifting builds muscle and
                  boosts metabolism, while cardio enhances endurance and burns
                  calories. Together, they create a powerful synergy for a
                  comprehensive and effective body transformation.
                </p>
              </Col>
              <Col md={6} className="my-2">
                <h5>Adapt Workouts to Your Body's Response</h5>
                <p>
                  Customize your fitness routine based on how your body responds
                  to weightlifting and cardio. Adjust intensity, duration, and
                  type of exercises to suit your goals and individual needs.
                  This adaptability ensures a sustainable and personalized path
                  to a healthier, fitter you
                </p>
              </Col>
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
                  <li>
                    <strong>Personalized Plans:</strong>
                    Benefit from custom-tailored workout routines and meal plans
                    that adapt to your fitness level, preferences, and goals.
                    Your journey is unique, and so is our approach.
                  </li>
                  <li>
                    <strong>Expert Guidance:</strong>
                    Our team of experienced fitness and nutrition experts is
                    here to guide you every step of the way. From form
                    correction to dietary advice, you'll have the support you
                    need to achieve your goals.
                  </li>
                  <li>
                    <strong>Versatile Workouts:</strong>
                    Enjoy a variety of workouts, including dynamic weightlifting
                    sessions to build strength and cardio routines for
                    endurance. Our diverse range of exercises keeps your routine
                    exciting and effective.
                  </li>
                  <li>
                    <strong>Nutrient-Rich Meals:</strong>
                    Say goodbye to bland diets. Our meal plans are not only
                    nutritious but also delicious. We believe in the power of
                    enjoying what you eat while nourishing your body.
                  </li>
                  <li>
                    <strong>Track Your Progress::</strong>
                    Stay motivated by tracking your progress seamlessly within
                    the your personal table and calculator. Celebrate
                    milestones, set new goals, and witness the positive changes
                    happening in your body and mind.
                  </li>
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
