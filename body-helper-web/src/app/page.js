"use server";
import HeroCarousel from "@/components/HeroCarousel";
import { Button, Col, Container, Row, Image as BtImage } from "react-bootstrap";
import { getLatestArticles } from "../../lib/articles";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import Rating from "@/components/Rating";
import nutritionSectionImg from "../../public/nutiotion-section.jpg";
import manCook from "../../public/man-cook.png";
import { getLatestRecipes } from "../../lib/recipes";
import { IoIosMail } from "react-icons/io";
import SubscribeSection from "@/components/SubscribeSection";

export default async function Home() {
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

  const articles = await getLatestArticles();
  const recipes = await getLatestRecipes();

  return (
    <>
      <section className="hero-section-home">
        <HeroCarousel />
      </section>
      <main>
        <section>
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
                <div className="my-4">
                  <Link className="link-button " href="/profile/createprofile">
                    Sing In
                  </Link>
                </div>
              </Col>
              <Col md={6}>
                <BtImage src="/sign-section-cutted.png" alt="fit-man" fluid />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="dark-bg">
          <h1 className="section-main-header">Latest Posts</h1>
          <Container>
            {articles.map((article) => (
              <div className="article-wrapper" key={article._id}>
                <Row
                  style={{
                    marginBottom: "20px",
                  }}>
                  <Col md={3}>
                    <div
                      style={{
                        height: "200px",
                        position: "relative",
                      }}>
                      <Image
                        className="article-img"
                        src={article.image}
                        alt={article.title}
                        fill
                      />
                    </div>
                  </Col>
                  <Col md={9}>
                    <h2>{article.title}</h2>
                    <div className="date-rating-wrapper">
                      <time>
                        <FaRegCalendarAlt />{" "}
                        {article.createdAt.toString().substring(3, 15)}
                      </time>
                      {
                        <Rating
                          value={article.rating}
                          text={`${article.numComments} reviews`}
                        />
                      }
                    </div>
                    <p>{article.summary}</p>
                    <Button variant="dark">
                      <Link
                        style={{ color: "white" }}
                        href={`/blog/${article.slug}`}>
                        Read more
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </Container>
        </section>
        <section>
          <h1 className="section-main-header">
            The Vital Role of Nutrition in Your Training Journey
          </h1>
          <Container>
            <p className="section-main-header">
              In the pursuit of fitness and peak performance, it's crucial to
              recognize the integral role that nutrition plays in shaping your
              training outcomes. Consider your body as a high-performance
              machine—without the right fuel, it won't function optimally.
            </p>
            <Row>
              <Col md={4}>
                <h2>Fuel for Performance</h2>
                <p>
                  Imagine a car trying to run on low-quality fuel; it might
                  sputter and struggle. Similarly, your body requires the right
                  balance of nutrients to power through workouts efficiently.
                  Proteins, carbohydrates, fats, vitamins, and minerals are the
                  essential components that contribute to sustained energy
                  levels, muscle repair, and overall well-being.
                </p>
                <h2>Muscle Repair and Growth</h2>
                <p>
                  After a workout, your muscles undergo stress and require
                  repair. Proteins, known as the building blocks of muscles,
                  play a key role in this recovery process. Incorporating
                  protein-rich foods into your diet helps repair damaged
                  tissues, promoting muscle growth and overall strength. Don't
                  underestimate the power of post-workout nutrition in enhancing
                  your body's ability to bounce back stronger.
                </p>
              </Col>
              <Col md={4}>
                <div className="nutrition-img-wrapper">
                  <Image
                    src={nutritionSectionImg}
                    alt="waist measurement"
                    fill
                  />
                </div>
              </Col>
              <Col md={4}>
                <h2>Maximizing Workouts</h2>
                <p>
                  Nutrition serves as the cornerstone for maximizing the
                  effectiveness of your workouts. Whether you're lifting
                  weights, running, or engaging in any form of exercise, your
                  body demands adequate fuel for endurance, strength, and
                  recovery. Consuming a balanced diet ensures you have the
                  energy reserves needed to push through challenging sessions
                  and make the most of your training time.
                </p>
                <h2>Holistic Well-being</h2>
                <p>
                  Beyond physical gains, proper nutrition positively impacts
                  your mental and emotional well-being. Nutrient-dense foods
                  contribute to better cognitive function, mood stability, and
                  overall vitality. When you nourish your body with the right
                  nutrients, you enhance your ability to tackle challenges, stay
                  focused, and maintain a positive mindset throughout your
                  training journey.
                </p>
              </Col>
            </Row>
            <Row>
              <h1 className="section-main-header">
                Wholesome Delights: Nourishing Your Body with Healthy Recipes
              </h1>
              <p>
                Welcome to our Healthy Recipes corner, where taste meets
                nutrition in a symphony of wholesome delights. We believe that
                eating well should never mean sacrificing flavor, and our
                collection of recipes is a testament to that philosophy. Check
                out our newest recipes.
              </p>
              {recipes.map((recipe) => (
                <Col key={recipe._id.toString()}>
                  <div className="card">
                    <img
                      src={recipe.image}
                      className="card-img-top"
                      alt={recipe.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <div className="date-rating-wrapper card-date-rating">
                        <time>
                          <FaRegCalendarAlt />{" "}
                          {recipe.createdAt.toString().substring(3, 15)}
                        </time>
                        {
                          <Rating
                            value={recipe.rating}
                            text={`${recipe.numComments} reviews`}
                          />
                        }
                      </div>
                      <p className="card-text">{recipe.summary}</p>
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="btn btn-dark">
                        Check Recipe
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
              <p>
                "Explore a world of culinary delights beyond our latest recipes!
                Dive into a treasure trove of flavors waiting to be discovered.
                Don't miss out—check out our full collection of mouthwatering
                recipes and embark on a delicious journey with each dish. Your
                next culinary adventure awaits!"
              </p>
              <Link href="/recipes" className="btn btn-dark">
                Explore all recipes
              </Link>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <SubscribeSection />
          </Container>
        </section>
      </main>
    </>
  );
}
