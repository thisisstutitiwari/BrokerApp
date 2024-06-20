import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import MyDetails from "./imgs/MyDetails.jpg";

// regular expressions for validation
const userRegex = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditDetails = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  // State variables for validation errors
  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");

  useEffect(() => {
    // Make a GET request to the API endpoint in your backend server
    axios
      .get(`http://localhost:8000/users/mydetails?userId=${userId}`)
      .then((response) => {
        const data = response.data.user;
        setUser(data);
        setUsername(data.username);
        setFirstName(data.name);
        setLastName(data.lastName);
        setEmailId(data.emailId);
        setPhoneNo(data.phoneNo);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset validation errors
    setUsernameError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailIdError("");
    setPhoneNoError("");

    // Perform client-side validation
    let isValid = true;

    if (!userRegex.test(username)) {
      setUsernameError("Invalid username");
      isValid = false;
    }

    if (!userRegex.test(firstName)) {
      setFirstNameError("Invalid first name");
      isValid = false;
    }

    if (!userRegex.test(lastName)) {
      setLastNameError("Invalid last name");
      isValid = false;
    }

    if (!emailRegex.test(emailId)) {
      setEmailIdError("Invalid email address");
      isValid = false;
    }

    if (!phoneRegex.test(phoneNo)) {
      setPhoneNoError("Invalid phone number");
      isValid = false;
    }

    // If the form is valid, send a request to update the details
    if (isValid) {
      // Create an object with updated details
      const updatedDetails = {
        username,
        name: firstName,
        lastName,
        emailId,
        phoneNo,
      };

      console.log(updatedDetails);

      // Send a POST request to update the user details
      axios
        .post(
          `http://localhost:8000/users/updateDetails?userId=${userId}`,
          updatedDetails
        )
        .then((response) => {
          alert("Details updated successfully ", response.data);
          // Optionally, you can show a success message or redirect to another page
        })
        .catch((error) => {
          console.error("Error updating details:", error);
          // Optionally, you can show an error message
        });
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", marginTop: "15vh" }}>
        <section className="my-details">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="card position-relative">
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#fff4",
                      pointerEvents: "none",
                    }}
                  ></div>
                  <img src={MyDetails} alt="My Details" />
                  <div className="card-body text-center position-absolute top-50 start-50 translate-middle">
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "50px",
                        fontWeight: "350",
                      }}
                    >
                      Edit Details
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Edit Details</h3>
                    <div className="card-text">
                      {user ? (
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Username:
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                usernameError ? "is-invalid" : ""
                              }`}
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && (
                              <div className="invalid-feedback">
                                {usernameError}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              First Name & Last Name:
                            </label>
                            <div className="row">
                              <div className="col">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    firstNameError ? "is-invalid" : ""
                                  }`}
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                                {firstNameError && (
                                  <div className="invalid-feedback">
                                    {firstNameError}
                                  </div>
                                )}
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    lastNameError ? "is-invalid" : ""
                                  }`}
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                                {lastNameError && (
                                  <div className="invalid-feedback">
                                    {lastNameError}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Email Id:
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                emailIdError ? "is-invalid" : ""
                              }`}
                              value={emailId}
                              onChange={(e) => setEmailId(e.target.value)}
                            />
                            {emailIdError && (
                              <div className="invalid-feedback">
                                {emailIdError}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Phone No:
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                phoneNoError ? "is-invalid" : ""
                              }`}
                              value={phoneNo}
                              onChange={(e) => setPhoneNo(e.target.value)}
                            />
                            {phoneNoError && (
                              <div className="invalid-feedback">
                                {phoneNoError}
                              </div>
                            )}
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Save Details
                          </button>
                        </form>
                      ) : (
                        <p>Loading user data...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditDetails;