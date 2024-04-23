import { useState } from "react";

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
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    confirmPwd: "",
    firstName: "",
    lastName: "",
    valueCheck: "",
    selectedRole: "Student",
    isGoogle: false,
    isReference: false,
    isOther: false,
  });

  const handleEmailChange = (event) => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        email: event.target.value,
      };
    });
  };

  const handlePwdChange = (event) => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        password: event.target.value,
      };
    });
  };

  const handleConfirmPwdChange = (event) => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        confirmPwd: event.target.value,
      };
    });
  };

  const handleFirstNameChange = (event) => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        firstName: event.target.value,
      };
    });
  };

  const handleLastNameChange = (event) => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        lastName: event.target.value,
      };
    });
  };

    //   const [selectedRole, setSelectedRole] = useState("Student");
    const handleSelectRole = (event) => {
        setUserInput((prev) => {
            return {
                ...prev,
                selectedRole: event.target.value
            }
        })
    }

  const handleSingleCheck = (event, item) => {
    item.value = !item.value;
    console.log(DATA_SOURCE);
    switch (item.name) {
      case "GOOGLE":
        setUserInput((prev) => {
          return {
            ...prev,
            isGoogle: item.value,
          };
        });
        break;
      case "REFERRED BY FRIEND":
        setUserInput((prev) => {
          return {
            ...prev,
            isReference: item.value,
          };
        });
        break;
      case "OTHER":
        setUserInput((prev) => {
          return {
            ...prev,
            isOther: item.value,
          };
        });
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={userInput.password}
            onChange={handlePwdChange}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            value={userInput.confirmPwd}
            onChange={handleConfirmPwdChange}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={userInput.firstName}
            onChange={handleFirstNameChange}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={userInput.lastName}
            onChange={handleLastNameChange}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          value={userInput.selectedRole}
          onChange={handleSelectRole}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
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
