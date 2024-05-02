import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import { Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import Signup from "./components/authenticate/SignUp.jsx";
import Login from "./components/authenticate/Login.jsx";
import ChangeContent from "./components/demohooks/ChangeContent.jsx";

const courses = [
  {
    id: 1,
    name: "Java",
  },
  {
    id: 2,
    name: "JavaScript",
  },
  {
    id: 3,
    name: "Python",
  },
  {
    id: 4,
    name: "ReactJS",
  },
];

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
  // handle useState vs input tag radio and checkbox
  const [checked, setChecked] = useState([]);
  const [checkRadio, setCheckRadio] = useState();

  // handle useState vs mounted & unmounted
  const [show, setShow] = useState(false);
  console.log(show);

  const handleCheckRadio = () => {
    console.log({ "id ": checkRadio });
    // setCheckRadio(checkRadio == null);
  };
  const handleCheckedBox = (id) => {
    setChecked((prevChecked) => {
      const isChecked = checked.includes(id);
      if (isChecked) {
        return checked.filter((item) => item !== id);
      } else {
        return [...prevChecked, id];
      }
    });
  };
  console.log([checked]);
  const handleResetChecked = () => {
    setChecked([""]);
  };

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
            <div className="check-box" style={{ marginBottom: "20px" }}>
              {courses.map((course) => (
                <div key={course.id}>
                  <input
                    type="checkbox"
                    checked={checked.includes(course.id)}
                    onChange={() => handleCheckedBox(course.id)}
                  />
                  {course.name}
                </div>
              ))}
              <button type="button" onClick={handleResetChecked}>
                Check again!
              </button>
            </div>
            <div className="check-radio">
              {courses.map((course) => (
                <div key={course.id}>
                  <input
                    type="radio"
                    checked={checkRadio === course.id}
                    onChange={() => setCheckRadio(course.id)}
                  />
                  {course.name}
                </div>
              ))}
              <button type="button" onClick={handleCheckRadio}>
                Check again!
              </button>
            </div>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <h1>Hello World!!!</h1>}
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/demo-hook" element={<ChangeContent />} />
    </Routes>
  );
}

export default App;
