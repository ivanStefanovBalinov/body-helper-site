import { Col, Container, Row } from "react-bootstrap";
import heroImg from "../../../public/food-scale.jpg";
import Image from "next/image";
const reasons = [
  {
    strong: "Balanced Nutrition:",
    text: " Keeping track of nutrients ensures that our body receives a well-rounded and balanced supply of essential vitamins, minerals, proteins, fats, and carbohydrates. A balanced diet is fundamental for proper growth, development, and the functioning of bodily systems.",
  },
  {
    strong: "Weight Management:",
    text: "Calorie monitoring plays a pivotal role in weight management. Whether you aim to lose, gain, or maintain weight, being aware of your caloric intake helps you adjust your diet accordingly. It allows you to create a calorie deficit for weight loss or a surplus for weight gain.",
  },
  {
    strong: "Energy Levels:",
    text: "Nutrients are the fuel our body needs for energy. Monitoring calorie intake helps ensure that we consume an appropriate amount to sustain our daily activities. This is vital for maintaining consistent energy levels throughout the day.",
  },
  {
    strong: "Disease Prevention:",
    text: "Certain health conditions, such as diabetes, heart disease, and obesity, are closely linked to dietary habits. Monitoring nutrients and calories can contribute to the prevention of these conditions by promoting a diet that supports overall health.",
  },
  {
    strong: "Performance Optimization:",
    text: "For athletes and individuals engaged in physical activities, tracking nutrients is essential for optimizing performance. Proper nutrition aids in muscle recovery, endurance, and overall physical well-being.",
  },
  {
    strong: "Mindful Eating:",
    text: "Monitoring nutrients encourages mindful eating. By paying attention to what we consume, we become more aware of our eating habits and are less likely to indulge in unhealthy or excessive food choices.",
  },
  {
    strong: "Nutrient Deficiency Prevention:",
    text: "Regular monitoring helps identify any potential nutrient deficiencies in our diet. By addressing these gaps, we can reduce the risk of health issues associated with insufficient intake of essential vitamins and minerals.",
  },
  {
    strong: "Educational Value:",
    text: "Keeping track of nutrients and calories fosters nutritional literacy. Understanding the nutritional value of different foods enables individuals to make informed decisions, promoting a culture of health and well-being.",
  },
];
const FoodCalculator = () => {
  return (
    <>
      <Container>
        <div className="hero-section">
          <Image src={heroImg} alt="Bodybuilder photo" fill />
          <h2>Nutrient Calculator</h2>
        </div>
        <section style={{ marginTop: "30px" }}>
          <h2>
            Why it is important to monitor the nutrients and calories of food
          </h2>
          <p>
            Monitoring the nutrients and calories of food is crucial for
            maintaining a healthy lifestyle and overall well-being.
            Understanding the nutritional content of what we consume empowers us
            to make informed and conscious choices about our diet. Here are
            several reasons why monitoring nutrients and calories is important:
          </p>
          <ol>
            <Row>
              {reasons.map((reason) => (
                <Col md={3} key={reason.strong}>
                  <li>
                    <p>
                      <strong>{reason.strong}</strong>
                      {reason.text}
                    </p>
                  </li>
                </Col>
              ))}
            </Row>
          </ol>
          <p>
            If you're interested in gaining a better understanding of your
            nutritional intake, we invite you to try our nutrition calculator.
            It's a valuable tool that can help you assess the balance of
            nutrients and calories in your diet. By inputting the foods you
            consume, the calculator can provide insights into your daily
            nutritional intake, making it easier for you to make informed and
            healthier choices. Give it a try and take a step towards a more
            conscious and balanced approach to your nutrition!
          </p>
        </section>
      </Container>
    </>
  );
};

export default FoodCalculator;
