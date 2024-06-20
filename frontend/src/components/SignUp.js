import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./Navbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    name: "",
    role: "",
    lastName: "",
    username: "",
    phoneNo: "",
    emailId: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    lastNameError: "",
    roleError: "",
    phoneNoError: "",
    emailIdError: "",
    passwordError: "",
    usernameError: "",
  });

  const [allFieldsRequired, setAllFieldsRequired] = useState("");

  const [messages] = useState({
    NAME_ERROR: "Name should be between 3 and 20 characters",
    LAST_NAME_ERROR: "LASTName should be between 3 and 20 characters",

    PHONE_NO_ERROR: "ENTER A VALID MOBILEB NO",

    ADDRESS_ERROR: "PROVIDE ADDRESS",

    EMAIL_ID_ERROR: "ENTER VALID EMAILID",

    PASSWORD_ERROR:
      "PASSWORD SHOULD CONTAIN MIN 8 CHARACTERS,ATLEAST 1 UPRCASE 1 LOWCASE & 1 SPECIAL CHARAC",

    MANDATORY: "Enter all the form fields",

    SUCCESS_MESSAGE: "REGISTER SUCCESSFULLY",

    ERROR_MESSAGE: "SOMETHING WENT WRONG",

    USER_NAME_ERROR: "ENTER VALID USERNAME",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const userRegex = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
    const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setstate({ ...state, [e.target.name]: e.target.value });
    if (e.target.name === "name") {
      setErrors({
        ...errors,
        nameError: e.target.value.length < 3 ? messages.NAME_ERROR : "",
      });
    }

    if (e.target.name === "lastName") {
      setErrors({
        ...errors,
        lastNameError:
          e.target.value.length < 3 ? messages.LAST_NAME_ERROR : "",
      });
    }
    if (e.target.name === "emailId") {
      setErrors({
        ...errors,
        emailIdError: emailRegex.test(e.target.value)
          ? ""
          : messages.EMAIL_ID_ERROR,
      });
    }
    if (e.target.name === "phoneNo") {
      setErrors({
        ...errors,
        phoneNoError: phoneRegex.test(e.target.value)
          ? ""
          : messages.PHONE_NO_ERROR,
      });
    }
    if (e.target.name === "username") {
      setErrors({
        ...errors,
        usernameError: userRegex.test(e.target.value)
          ? ""
          : messages.USER_NAME_ERROR,
      });
    }
    if (e.target.name === "password") {
      setErrors({
        ...errors,
        passwordError: passwordRegex.test(e.target.value)
          ? ""
          : messages.PASSWORD_ERROR,
      });
    }

    setAllFieldsRequired("");
  };

  const handleGenderChange = (e) => {
    setstate({ ...state, gender: e.target.value });
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  const signUpButton = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/register",
        state
      );
      navigate("/login");
      console.log(data);
    } catch (err) {
      setAllFieldsRequired(err.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card card-img-fluid">
          <div className="row">
            <div className="col-md-6">
              <img src="broker3.jpg" alt="Broker" className="card-img-top" />
              <div className="card-img-overlay">
                <h6>Let's make it happen together</h6>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <h5 className="text-center">Sign Up to Login</h5>
                <form className="form">
                  <div
                    className="row"
                    style={{ paddingLeft: "10px", marginBottom: "0" }}
                  >
                    <div class="input-field col s4 ">
                      <label for="first_name">First Name</label>
                      <input
                        id="first_name"
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.nameError !== "" ? (
                        <small>{errors.nameError}</small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      class="input-field col s4"
                      style={{ paddingRight: "23px" }}
                    >
                      <label for="last_name">Last Name</label>
                      <input
                        id="last_name"
                        type="text"
                        name="lastName"
                        value={state.lastName}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {errors.lastNameError !== "" ? (
                        <small>{errors.lastNameError}</small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ paddingLeft: "10px", marginBottom: "0" }}
                  >
                    <div class="input-field col s6">
                      <input
                        id="email"
                        type="email"
                        name="emailId"
                        value={state.emailId}
                        onChange={(e) => handleChange(e)}
                      />{" "}
                      {errors.emailIdError !== "" ? (
                        <small>{errors.emailIdError}</small>
                      ) : (
                        ""
                      )}
                      <label for="email">Email</label>
                    </div>
                    <div
                      class="input-field col s12"
                      style={{ paddingRight: "23px" }}
                    >
                      <input
                        id="phn_number"
                        name="phoneNo"
                        type="text"
                        value={state.phoneNo}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.phoneNoError !== "" ? (
                        <small>{errors.phoneNoError}</small>
                      ) : (
                        ""
                      )}
                      <label for="phn_number">Phone Number</label>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ paddingLeft: "10px", marginBottom: "0" }}
                  >
                    <div class="input-field col s4">
                      <select
                        class="form-control"
                        name="role"
                        value={state.role}
                        onChange={(e) => handleRoleChange(e)}
                      >
                        <option value="">select role</option>
                        <option value="agent">Agent</option>
                        <option value="owner">Owner</option>
                        <option value="tenant">Tenant</option>
                      </select>
                    </div>
                    <div
                      class="input-field col s4"
                      style={{ paddingRight: "23px" }}
                    >
                      <input
                        id="user_name"
                        type="text"
                        name="username"
                        value={state.username}
                        onChange={(e) => handleChange(e)}
                      />{" "}
                      {errors.usernameError !== "" ? (
                        <small>{errors.usernameError}</small>
                      ) : (
                        ""
                      )}
                      <label for="user_name">user_name</label>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ paddingLeft: "10px", marginBottom: "0" }}
                  >
                    <div className="input-field col s4">
                      <label htmlFor="gender" style={{ paddingTop: "5%" }}>
                        Gender
                      </label>
                      <p style={{ paddingLeft: "50px" }}>
                        <label>
                          <input
                            className="with-gap"
                            name="group1"
                            type="radio"
                            value="Male"
                            checked={state.gender === "Male"}
                            onChange={handleGenderChange}
                          />
                          <span>Male</span>
                        </label>
                      </p>
                      <p style={{ paddingLeft: "50px" }}>
                        <label>
                          <input
                            className="with-gap"
                            name="group1"
                            type="radio"
                            value="Female"
                            checked={state.gender === "Female"}
                            onChange={handleGenderChange}
                          />
                          <span>Female</span>
                        </label>
                      </p>
                    </div>
                    <div
                      class="input-field col s4"
                      style={{ paddingRight: "23px" }}
                    >
                      <input
                        id="password"
                        type="text"
                        name="password"
                        value={state.password}
                        onChange={(e) => handleChange(e)}
                      />{" "}
                      {errors.passwordError !== "" ? (
                        <small>{errors.passwordError}</small>
                      ) : (
                        ""
                      )}
                      <label for="password">password</label>
                    </div>
                  </div>
                 
                  <div style={{ position: "relative" }}>
                    <div className="fixed-button">
                      <a
                        class="waves-effect waves-light btn-large z-depth-4"
                        onClick={signUpButton}
                      >
                        SignUp
                      </a>
                    </div>
                    <div className="error-message">
                      {allFieldsRequired && <div>{allFieldsRequired}</div>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;