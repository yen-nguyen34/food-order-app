import { useState } from "react";
import Input from "./Input";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualsToOtherValue,
} from "../util/validation";

const DATA_SOURCE = [
  {
    name: "GOOGLE",
    value: false,
  },
  {
    name: "REFERRED BY FRIEND",
    value: false,
  },
  {
    name: "OTHER",
    value: false,
  },
];

function Signup() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
    confirmPwd: "",
    firstName: "",
    lastName: "",
    selectedRole: "Student",
    isGoogle: false,
    isReference: false,
    isOther: false,
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
    confirmPwd: false,
    firstName: false,
    lastName: false,
    selectedRole: false,
    isGoogle: false,
    isReference: false,
    isOther: false,
  });

  const handleUserInputChange = (identifier, value) => {
    // identifier: key [email, password,... tu dat]
    setEnteredValues((prevUserInput) => {
      return {
        ...prevUserInput,
        [identifier]: value,
      };
    });

    setDidEdit((prevEditValue) => ({
      ...prevEditValue,
      [identifier]: false,
    }));
  };

  const handleSingleCheck = (event, item) => {
    item.value = !item.value;
    console.log(DATA_SOURCE);
    switch (item.name) {
      case "GOOGLE":
        setEnteredValues((prev) => {
          return {
            ...prev,
            isGoogle: item.value,
          };
        });
        break;
      case "REFERRED BY FRIEND":
        setEnteredValues((prev) => {
          return {
            ...prev,
            isReference: item.value,
          };
        });
        break;
      case "OTHER":
        setEnteredValues((prev) => {
          return {
            ...prev,
            isOther: item.value,
          };
        });
        break;
    }
  };

  const isValidEmail =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);

  const isValidPwdLength =
    didEdit.password &&
    !hasMinLength(enteredValues.password, 8) &&
    !isNotEmpty(enteredValues.email);

  const isEqualConfirmPwd =
    didEdit.password &&
    !isEqualsToOtherValue(enteredValues.password, enteredValues.confirmPwd);

  const isNotEmptyValues =
    didEdit.email &&
    didEdit.password &&
    didEdit.confirmPwd &&
    didEdit.firstName &&
    didEdit.lastName &&
    didEdit.selectedRole &&
    didEdit.isGoogle &&
    didEdit.isReference &&
    didEdit.isOther;
  !isNotEmpty(
    enteredValues.email,
    enteredValues.password,
    enteredValues.confirmPwd,
    enteredValues.firstName,
    enteredValues.lastName,
    enteredValues.selectedRole,
    enteredValues.isGoogle,
    enteredValues.isReference,
    enteredValues.isOther
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(enteredValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>
      <div className="control">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={enteredValues.email}
          onChange={(event) =>
            handleUserInputChange("email", event.target.value)
          }
          error={isValidEmail && "Please enter a valid email address."}
        />
        <div className="control-row">
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(event) =>
              handleUserInputChange("password", event.target.value)
            }
            error={isValidPwdLength && "Please enter a valid password."}
          />
          <Input
            label="Confirm Password"
            id="confirm-password"
            type="password"
            name="confirm-password"
            value={enteredValues.confirmPwd}
            onChange={(event) =>
              handleUserInputChange("confirmPwd", event.target.value)
            }
            error={isEqualConfirmPwd && "Please enter them same password."}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <Input
          label="First Name"
          type="text"
          id="first-name"
          name="first-name"
          value={enteredValues.firstName}
          onChange={(event) =>
            handleUserInputChange("firstName", event.target.value)
          }
        />

        <Input
          label="Last Name"
          type="text"
          id="last-name"
          name="last-name"
          value={enteredValues.lastName}
          onChange={(event) =>
            handleUserInputChange("lastName", event.target.value)
          }
        />
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          value={enteredValues.selectedRole}
          onChange={(event) =>
            handleUserInputChange("selectedRole", event.target.value)
          }
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Employee">Employee</option>
          <option value="Founder">Founder</option>
          <option value="Other">Other</option>
        </select>
        {}
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        {DATA_SOURCE.map((item, index) => (
          <div className="control" key={index}>
            <input
              type="checkbox"
              name={item.name}
              onChange={(e) => handleSingleCheck(e, item)}
            />
            <label>{item.name}</label>
          </div>
        ))}
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}

export default Signup;
