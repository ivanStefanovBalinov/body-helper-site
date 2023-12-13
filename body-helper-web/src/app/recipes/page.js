import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import heroImg from "../../../public/recipes-hero.jpg";
import { getAllRecipes } from "../../../lib/recipes";
import { FaRegCalendarAlt } from "react-icons/fa";
import Rating from "@/components/Rating";
import NutrientDetails from "@/components/NutrientDetails";
import Link from "next/link";
const Recipes = async () => {
  const recipes = await getAllRecipes();
  const latestRecipeIndex = recipes.length - 1;
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
      </Container>
    </>
  );
};

export default Recipes;
