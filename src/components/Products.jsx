import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { formatCurrency } from "./util/formatting.js";
import Buttons from "./Buttons.jsx";
import Login from "./authenticate/Login.jsx";
import Signup from "./authenticate/SignUp.jsx";

const Products = forwardRef(({ addToCartCallback }, ref) => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function getMeals() {
      const response = await fetch("http://localhost:3000/meals");
      const resData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch meals...");
      }

      setMeals(resData);
    }
    getMeals();
  }, []);

  const addToCart = (id, name, price) => {
    addToCartCallback(id, name, price);
  };

  const updateMeals = (newMeals) => {
    setMeals(newMeals);
  };

  useImperativeHandle(ref, () => ({
    updateMeals: updateMeals,
  }));

  return (
    <>
      <ul id="meals">
        {meals.length > 0 &&
          meals.map((meal) => (
            <li key={meal.id}>
              <article className="meal-item">
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.name}
                />
                <h3>{meal.name}</h3>
                <p className="meal-item-price">
                  {formatCurrency.format(meal.price)}
                </p>
                <p className="meal-item-description">{meal.description}</p>
                <p className="meal-item-actions">
                  <Buttons
                    textOnly={false}
                    buttonTxt={"Add to Cart"}
                    onClickCallback={() => {
                      addToCart(meal.id, meal.name, meal.price);
                    }}
                  ></Buttons>
                </p>
              </article>
            </li>
          ))}
        {meals.length == 0 && (
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: "0.75rem 0",
              textAlign: "center",
            }}
          >
            No Meals Found...
          </h2>
        )}
      </ul>
    </>
  );
});

export default Products;
