import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
// import Login from "./components/authenticate/Login.jsx";
import { useRef, useState } from "react";
import { createBrowserRouter } from "react-router-dom";

function App() {
  const [cart, setCart] = useState(new Map());
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const productsRef = useRef();
  const router = createBrowserRouter([{

    path: "/",
    element: <App />,
    children: [
      {
        path: "cart"
      }
    ]
  }
  ])

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
    <>
      <div style={{ position: "relative" }}>
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
      </div>
      
        <Products addToCartCallback={addItemToCart} ref={productsRef} />
    </>
  );
}

export default App;
