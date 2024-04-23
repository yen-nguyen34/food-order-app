import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";
import { userInfo } from "node:os";
import { setDefaultResultOrder } from "node:dns";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

let meals = null
const PORT_NUMBER = 3000

const init = async () => {
  const mealsData = await fs.readFile("./data/available-meals.json", "utf8");
  meals = await JSON.parse(mealsData);
  console.log(`SERVER STARTED LISTENING ON PORT ${PORT_NUMBER}`);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  res.status(200).json(JSON.parse(meals));
});

app.get("/search", async (req, res) => {
  const filter = req.query.keyword;

  const filterRegex = new RegExp(`^.{0,}${filter.toLocaleLowerCase()}.{0,}$`)
  const filteredMeals = meals.filter((meal) => {
    return meal.name.toLocaleLowerCase().match(filterRegex)
  })
  res.status(200).json(filteredMeals);
  console.log(filteredMeals);
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length == 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200);
  }

  res.status(404).json({ message: "Not found" });
});

// sign up
// app.post("/sign_up", async (req, res) => {
//   let email = req.body.email;
//   let pwd = req.body.pwd;
//   let confirmPwd = req.body.confirmPwd;
//   let firstName = req.body.firstName;
//   let lastName = req.body.lastName;
//   let selectRole = req.body.selectRole;
// })

await init();
app.listen(PORT_NUMBER);
