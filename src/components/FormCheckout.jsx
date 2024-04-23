import { useEffect, useRef } from "react";
import Buttons from "./Buttons.jsx";

function FormCheckout({ closeFormCheckout }) {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
  };
  async function postData() {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullNameRef.current.value,
          emailAdd: emailRef.current.value,
          phoneNum: phoneRef.current.value,
          street: streetRef.current.value,
          postalCode: postalCodeRef.current.value,
          city: cityRef.current.value,
        }),
      };
      const response = await fetch("http://localhost:3000/orders", options);
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p className="control">
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" required ref={fullNameRef} />
        </p>
        <p className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input id="email" type="email" resource="" ref={emailRef} />
        </p>
        <p className="control">
          <label htmlFor="phone-number">Phone Number</label>
          <input id="phone-number" type="number" required ref={phoneRef} />
        </p>
        <p className="control">
          <label htmlFor="street">Street</label>
          <input id="street" type="text" required ref={streetRef} />
        </p>
        <div className="control-row">
          <p className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              id="postal-code"
              type="number"
              required
              ref={postalCodeRef}
            />
          </p>
          <p className="control">
            <label htmlFor="city">City</label>
            <input id="city" type="text" required ref={cityRef} />
          </p>
        </div>
        <p className="modal-actions">
          <Buttons
            textOnly={true}
            onClickCallback={closeFormCheckout}
            buttonTxt="Back"
          />
          <Buttons textOnly={false} buttonTxt="Submit Order" />
        </p>
      </form>
    </>
  );
}

export default FormCheckout;
