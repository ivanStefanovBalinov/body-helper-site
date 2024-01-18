import { Button, Col, Container, Row } from "react-bootstrap";
import seafoodImg from "../../../../../public/category-seafood.jpg";
import Image from "next/image";
import Link from "next/link";
import { getRecipesByCategory } from "../../../../../lib/recipes";
import NutrientDetails from "@/components/NutrientDetails";

export async function generateMetaData({ params }) {
  const slug = params.slug;
  const recipe = await getRecipesByCategory(slug);
  return {
    title: recipe.title,
    description: recipe.summary,
    author: recipe.author,
    keywords: [
      "Fitness",
      "Nutrition",
      "Diets",
      "Healthy",
      "Calories",
      "Meals",
      "Recipes",
      "Cooking",
    ],
  };
}

const RecipeCategory = async ({ params }) => {
  const slug = params.slug;
  const title = slug
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const recipes = await getRecipesByCategory(slug);
  return (
    <>
      <Container>
        <div className="hero-section">
          <Image src={`/category-${slug}.jpg`} alt="Bodybuilder photo" fill />
          <h2>{title}</h2>
        </div>
        <Button
          variant="dark"
          size="lg"
          style={{ color: "white", margin: "15px 0px" }}>
          <Link style={{ color: "white" }} href="/recipes">
            Back
          </Link>
        </Button>
        <Row>
          {recipes.map((recipe, index) => (
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
          ))}
        </Row>
      </Container>
    </>
  );
};

export default RecipeCategory;
