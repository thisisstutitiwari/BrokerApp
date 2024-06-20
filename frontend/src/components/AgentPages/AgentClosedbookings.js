import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Navbar";
const Closedbookings = () => {
  const [propertyData, setPropertyData] = useState([]);
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
  }, []);

  const navLinks = {
    agentviewproperty: "Open Bookings",
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
          propertyData.some((property) => property.status === "closed") ? (
            propertyData
              .filter((property) => property.status === "closed")
              .map((property) => {
                let statusColor =
                  property.status.toLowerCase() === "open" ? "green" : "red";

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
            <h2 className="my-5">No properties closed by this agent</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Closedbookings;