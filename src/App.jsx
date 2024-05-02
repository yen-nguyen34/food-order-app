import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import { Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import Signup from "./components/authenticate/SignUp.jsx";
import Login from "./components/authenticate/Login.jsx";

function List({ data }) {
  return (
    <ul>
      {data.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ShowPerson({ employee }) {
  return (
    <ul>
      Person Information
      {employee.map((item) => (
        <li key={item.id}>
          <p>{item.name}</p>
          <p>{item.age}</p>
          <p>{item.title}</p>
        </li>
      ))}
    </ul>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}

function App() {
  const [cart, setCart] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const productsRef = useRef();

  const cars = ["Huyndai", "KIA", "Mec", "Toyota", "BMW"];
  const person = [
    {
      id: 63200199,
      name: "Anna",
      age: "24",
      title: "Assistant",
    },
  ];
  const addItemToCart = (id, name, price) => {
    if (!cart.has(id)) {
      setCart(
        new Map(
          cart.set(id, {
            name: name,
            price: price,
            quanity: 1,
          })
        )
      );
    } else {
      setCart(
        new Map(
          cart.set(id, {
            name: name,
            price: price,
            quanity: cart.get(id).quanity + 1,
          })
        )
      );
    }
    setTotalPrice((oldPrice) =>
      (parseFloat(oldPrice) + parseFloat(price)).toFixed(2)
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header
              noOfItems={cart.size}
              showCartCallback={() => setShowCart(true)}
              searchCallback={(newProducts) => {
                productsRef.current.updateMeals(newProducts);
              }}
            />
            {showCart && (
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  paddingRight: 30,
                  paddingTop: 100,
                  justifyContent: "flex-end",
                }}
                onClick={() => setShowCart(false)}
              >
                <div
                  style={{
                    height: "fit-content",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Cart
                    cart={cart}
                    totalPrice={totalPrice}
                    closeCallback={() => setShowCart(false)}
                  ></Cart>
                </div>
              </div>
            )}
            <Products addToCartCallback={addItemToCart} ref={productsRef} />
            <div>
              <List data={cars} />
              <Button>Click me!</Button>
            </div>
            <div>
              <ShowPerson employee={person} />
            </div>
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
}

export default App;
