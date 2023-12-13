import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import heroImg from "../../../public/recipes-hero.jpg";
import { getAllRecipes } from "../../../lib/recipes";
import { FaRegCalendarAlt } from "react-icons/fa";
import Rating from "@/components/Rating";
import NutrientDetails from "@/components/NutrientDetails";
import { GiChickenOven } from "react-icons/gi";
import { LuSalad } from "react-icons/lu";
import { TbBreadOff } from "react-icons/tb";
import { GiFruitBowl } from "react-icons/gi";
import Link from "next/link";
import { GiMeat } from "react-icons/gi";
import { FaFishFins } from "react-icons/fa6";
import MealCategories from "@/components/MealCategories";

const Recipes = async () => {
  const recipes = await getAllRecipes();
  const latestRecipeIndex = recipes.length - 1;

  const mealCategory = [
    { title: "Chicken", icon: <GiChickenOven /> },
    { title: "Meat", icon: <GiMeat /> },
    { title: "Sea Food", icon: <FaFishFins /> },
    { title: "Low Carbs", icon: <TbBreadOff /> },
    { title: "Salad", icon: <LuSalad /> },
    { title: "Vegetarian", icon: <GiFruitBowl /> },
  ];
  return (
    <>
      <Container>
        <div className="hero-section">
          <Image src={heroImg} alt="Bodybuilder photo" fill />
          <h2>Recipes</h2>
        </div>
        <section>
          <Row style={{ marginTop: "30px" }}>
            <Col md={6}>
              <div className="latest-recipe-img-wrapper">
                <Image
                  src={recipes[latestRecipeIndex].image}
                  alt={recipes[latestRecipeIndex].title}
                  fill
                />
              </div>
            </Col>
            <Col md={6} className="latest-recipe-info">
              <h5 style={{ color: "#ccc" }}>Latest recipe</h5>
              <h1>{recipes[latestRecipeIndex].title}</h1>
              <div className="date-rating-wrapper">
                {
                  <Rating
                    value={recipes[latestRecipeIndex].rating}
                    text={`${recipes[latestRecipeIndex].numComments} reviews`}
                  />
                }
              </div>
              <NutrientDetails
                title={true}
                calories={recipes[latestRecipeIndex].calories}
                protein={recipes[latestRecipeIndex].protein}
                carbs={recipes[latestRecipeIndex].carbs}
                fats={recipes[latestRecipeIndex].fats}
                fiber={recipes[latestRecipeIndex].fiber}
                sugar={recipes[latestRecipeIndex].sugar}
              />
              <Link
                className="btn btn-dark"
                href={`/recipes/${recipes[latestRecipeIndex].slug}`}>
                Check full recipe
              </Link>
            </Col>
          </Row>
        </section>
        <section style={{ padding: "40px 0px" }}>
          <Row>
            <h3>Browse Recipes</h3>
            {mealCategory.map((category) => (
              <Col md={2} key={category.title}>
                <MealCategories title={category.title} icon={category.icon} />
              </Col>
            ))}
          </Row>
          <Row style={{ marginTop: "30px" }}>
            {recipes.map((recipe, index) => {
              if (index !== latestRecipeIndex) {
                return (
                  <Col md={4} key={recipe._id.toString()}>
                    <Link
                      className="recipe-link-card"
                      href={`/recipes/${recipe.slug}`}
                      key={index + 1}>
                      <div className="card">
                        <img
                          src={recipe.image}
                          className="card-img-top"
                          alt={recipe.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{recipe.title}</h5>

                          <NutrientDetails
                            calories={recipe.calories}
                            protein={recipe.protein}
                            carbs={recipe.carbs}
                            fats={recipe.fats}
                          />
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              }
            })}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default Recipes;
