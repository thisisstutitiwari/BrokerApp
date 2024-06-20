import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import MyDetails from "./imgs/MyDetails.jpg";

const Mydetails = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Make a GET request to the API endpoint in your backend server
    axios
      .get(`http://localhost:8000/users/mydetails?userId=${userId}`)
      .then((response) => {
        const data = response.data.user;
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
      });
  }, [userId]);

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
                        fontSize: "60px",
                        fontWeight: "350",
                      }}
                    >
                      My Details
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">My Details</h3>
                    <div className="card-text">
                      {user ? (
                        <>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Username:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={user.username}
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              First Name & Last Name:
                            </label>
                            <div className="row">
                              <div className="col">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={user.name}
                                  readOnly
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={user.lastName}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Email Id:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={user.emailId}
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-bold">
                              Phone No:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={user.phoneNo}
                              readOnly
                            />
                          </div>
                          <Link to="/editdetails" className="btn btn-primary">
                            Edit Details
                          </Link>
                        </>
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

export default Mydetails;