import React from "react";
import { GiFlame } from "react-icons/gi";
const NutrientDetails = ({
  calories,
  protein,
  carbs,
  fats,
  sugar,
  fiber,
  title,
}) => {
  return (
    <div className="nutrition-detail-wrapper">
      {title && <h4>Nutrients per portion</h4>}
      <div className="nutrient-detail-item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <GiFlame />
          <strong>Calories</strong>
        </div>
        <p>{calories}</p>
      </div>
      <div className="nutrient-detail-item">
        <div>
          <strong>Protein</strong>
        </div>
        <p>{protein}</p>
      </div>
      <div className="nutrient-detail-item">
        <div>
          <strong>Carbs</strong>
        </div>
        <p>{carbs}</p>
      </div>
      <div className="nutrient-detail-item">
        <div>
          <strong>Fats</strong>
        </div>
        <p>{fats}</p>
      </div>
      {fiber && (
        <div className="nutrient-detail-item">
          <div>
            <strong>Fiber</strong>
          </div>
          <p>{fiber}</p>
        </div>
      )}
      {sugar && (
        <div className="nutrient-detail-item">
          <div>
            <strong>Sugar</strong>
          </div>
          <p>{sugar}</p>
        </div>
      )}
    </div>
  );
};

export default NutrientDetails;
