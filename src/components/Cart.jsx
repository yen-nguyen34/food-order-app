import { useEffect, useState } from "react";
import FormCheckout from "./FormCheckout";
import Buttons from "./Buttons.jsx";

function Cart({ cart, totalPrice, closeCallback }) {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        padding: "0px 40px 5px 40px",
        borderRadius: "20px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
        color: "black",
      }}
    >
      {!showCheckout && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <h2>Your Cart</h2>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                width: "180px",
              }}
            ></span>
            <span
              style={{
                width: "25px",
              }}
            ></span>
            <span
              style={{
                width: "50px",
              }}
            ></span>
          </div>
          <ul
            style={{
              padding: "0",
              marginTop: "0",
            }}
          >
            {[...cart.keys()].map((id) => (
              <li
                key={id}
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    width: "180px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {cart.get(id).name}{" "}
                </span>
                <span
                  style={{
                    width: "25px",
                    textAlign: "center",
                  }}
                >
                  {cart.get(id).quanity}
                </span>
                <span
                  style={{
                    width: "50px",
                  }}
                >
                  ${cart.get(id).price}{" "}
                </span>
              </li>
            ))}
          </ul>
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "black",
            }}
          ></div>
          <p className="cart-total">Total: ${totalPrice}</p>
          <p className="modal-actions">
            <Buttons
              textOnly={true}
              onClickCallback={closeCallback}
              buttonTxt="Close"
            />
            <Buttons
              textOnly={false}
              onClickCallback={() => setShowCheckout(true)}
              buttonTxt="Checkout"
            />
          </p>
        </>
      )}
      {showCheckout && (
        <FormCheckout
          closeFormCheckout={() => setShowCheckout(false)}
        ></FormCheckout>
      )}
    </div>
  );
}
export default Cart;
