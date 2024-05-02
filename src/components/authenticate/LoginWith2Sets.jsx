import { useState } from "react";

function LoginWith2Sets() {
  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (event) => {
    setEnteredValue((prevUserInput) => {
      return {
        ...prevUserInput,
        email: event.target.value,
      };
    });
  };

  const handlePwdChange = (event) => {
    setEnteredValue((prevUserInput) => {
      return {
        ...prevUserInput,
        password: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(enteredValue);
  };

  const handleReset = () => {
    setEnteredValue({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email-login">Email</label>
          <input
            id="email-login"
            type="email"
            name="email-login"
            value={enteredValue.email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password-login">Password</label>
          <input
            id="password-login"
            type="password"
            name="password-login"
            value={enteredValue.password}
            onChange={handlePwdChange}
            required
            minLength={8}
          />
        </div>
      </div>

      <p className="form-actions">
        <button type="submit" className="button">
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

export default LoginWith2Sets;
