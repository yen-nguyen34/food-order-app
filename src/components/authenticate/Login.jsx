import { useState } from "react";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  let navigate = useNavigate();

  const isValidEmail =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);

  const isValidPwd =
    didEdit.password &&
    !hasMinLength(enteredValues.password, 8) &&
    !isNotEmpty(enteredValues.password);

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevUserInput) => ({
      ...prevUserInput,
      [identifier]: value,
    }));
    setDidEdit((prevEditValue) => ({ ...prevEditValue, [identifier]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(enteredValues);
  };

  const handleReset = () => {
    setEnteredValues({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label="Email"
          id="email-login"
          type="email"
          name="email"
          value={enteredValues.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
          error={isValidEmail && "Please enter a valid email address."}
        />
        {console.log(isValidEmail)}
        <Input
          label="Password"
          id="password-login"
          type="password"
          name="password"
          value={enteredValues.password}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          error={isValidPwd && "Please enter a valid password."}
        />
      </div>

      <p className="form-actions">
        <button
          type="submit"
          className="button"
          onClick={() => navigate("/meals")}
        >
          Login
        </button>
        <button
          type="button"
          className="button button-flat"
          onClick={handleReset}
        >
          Reset
        </button>
      </p>
    </form>
  );
}

export default Login;
