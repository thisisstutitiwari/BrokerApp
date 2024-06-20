import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../Navbar";
const AgentViewProperty = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [approvalSuccess, setApprovalSuccess] = useState(null);
  const [approvalError, setApprovalError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/property/getpropertiesbyagent/${userId}`)
      .then((propertyData) => {
        setPropertyData(propertyData.data);
        console.log(propertyData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [approvalSuccess, approvalError]);

  const handleActionClick = (property) => {
    setSelectedProperty(property);
    setIsDialogOpen(true);
  };

  const approveBooking = () => {
    if (selectedProperty) {
      axios
        .post(
          `http://localhost:8000/property/approvebooking/${selectedProperty}/${userId}`
        )
        .then((response) => {
          setApprovalSuccess(response.data.message);
          setSelectedProperty(null); // Clear the selected property ID
          setTimeout(() => {
            setApprovalSuccess(null); // Clear the success message after some time
            setIsDialogOpen(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error assigning property:", error);
          setApprovalError("Failed to assign property. Please try again.");
        });
    }
  };

  const declineBooking = () => {
    if (selectedProperty) {
      axios
        .post(
          `http://localhost:8000/property/declinebooking/${selectedProperty}/${userId}`
        )
        .then((response) => {
          setApprovalSuccess(response.data.message);
          setSelectedProperty(null);
          setTimeout(() => {
            setApprovalSuccess(null);
            setIsDialogOpen(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error declining booking:", error);
          setApprovalError("Failed to decline booking. Please try again.");
        });
    }
  };

  const navLinks = {
    closedbookings: "Closed Bookings",
  };

  return (
    <div className="col-12">
      <Navbar navLinks={navLinks} />
      <div className="banner-container">
        <img
          src={
            "https://5.imimg.com/data5/SELLER/Default/2022/9/DV/OM/KY/3971970/domestic-hazardous-shipping.jpg"
          }
          alt="Banner"
          className="banner-image"
          style={{
            width: "100%",
          }}
        />
        <div
          className="banner-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff50",
          }}
        ></div>
        <h1
          className="banner-text"
          style={{
            position: "absolute",
            fontSize: "40px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            whiteSpace: "nowrap"
          }}
        >
          <span style={{ color: "#6007A2", fontSize: "70px" }}>Rent </span>Your
          Dream House with us
        </h1>
      </div>

      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <div
          style={{
            padding: "10px",
            marginTop: "-20px",
            marginBottom: "-200px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {propertyData &&
          propertyData.some((property) => property.status === "waiting") ? (
            propertyData
              .filter((property) => property.status === "waiting")
              .map((property) => {
                let statusColor =
                  property.status.toLowerCase() === "open"
                    ? "green"
                    : property.status.toLowerCase() === "waiting"
                    ? "orange"
                    : "red";

                const truncatedName =
                  property.name.length > 12
                    ? property.name.slice(0, 12) + "..." // Truncate text with ellipsis
                    : property.name;

                return (
                  <div
                    className="col-4"
                    style={{
                      padding: "5px",
                      minWidth: "300px",
                      maxWidth: "300px",
                      minHeight: "350px",
                      maxHeight: "350px",
                    }}
                  >
                    <div
                      className="card"
                      style={{ padding: "5px", position: "relative" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          backgroundColor: statusColor,
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {property.status}
                      </div>
                      <img
                        className="card-img-top"
                        src={property.photourl || "broker7.jpg"}
                        style={{
                          objectFit: "cover",
                          maxHeight: "165px",
                          minHeight: "165px",
                        }}
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 title={property.name}>{truncatedName}</h6>
                          <button
                            onClick={() => handleActionClick(property._id)}
                            className="btn btn-small"
                            style={{
                              backgroundColor: "#6007A2",
                              color: "white",
                              width: "100px",
                            }}
                            disabled={property.status === "closed"}
                          >
                            Action
                          </button>
                        </div>

                        <div style={{ display: "flex" }}>
                          <h6>Rs.{property.price}</h6>
                          <i
                            class="tiny material-icons"
                            style={{ paddingLeft: "50px" }}
                          >
                            local_hotel
                          </i>
                          <p style={{ fontSize: "13px", paddingLeft: "8px" }}>
                            {property.bhk}BHK
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <i class="tiny material-icons">place</i>
                          <p style={{ fontSize: "13px", paddingLeft: "8px" }}>
                            {property.propertyDetails}
                          </p>
                          <i
                            class="tiny material-icons"
                            style={{ paddingLeft: "40px" }}
                          >
                            call
                          </i>
                          <p style={{ fontSize: "13px", paddingLeft: "8px" }}>
                            {property.phoneNo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <h2 className="my-5">No properties waiting for action</h2>
          )}
        </div>
      </div>
      {isDialogOpen && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "5px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              overflowY: "auto",
              maxHeight: "80vh",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <h3>Choose an Action</h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                style={{
                  border: "1px solid",
                  color: "#000020",
                  borderColor: "gray",
                  borderRadius: "100px",
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                X
              </button>
            </div>
            <div className="mt-5 d-flex justify-content-evenly align-items-center">
              <button
                onClick={() => {
                  approveBooking();
                }}
                style={{
                  margin: "5px",
                  padding: "10px 20px",
                  backgroundColor: "green",
                  color: "white",
                  border: "2px",
                  borderColor: "#6007A2",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Approve
              </button>
              <button
                onClick={() => {
                  declineBooking();
                }}
                style={{
                  margin: "5px",
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "2px",
                  borderColor: "#6007A2",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Deny
              </button>
            </div>
            {approvalError && (
              <p
                className="error"
                style={{
                  color: "red",
                  marginTop: "10px",
                }}
              >
                {approvalError}
              </p>
            )}
            {approvalSuccess && (
              <p
                className="success"
                style={{
                  color: "green",
                  marginTop: "10px",
                }}
              >
                {approvalSuccess}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentViewProperty;