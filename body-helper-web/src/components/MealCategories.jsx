import Link from "next/link";
import React from "react";

const MealCategories = ({ title, icon }) => {
  return (
    <Link
      className="meal-category-item"
      href={`/recipes/category/${title.toLowerCase().replace(/\s/g, "")}`}>
      {icon}
      <p>{title}</p>
    </Link>
  );
};

export default MealCategories;
