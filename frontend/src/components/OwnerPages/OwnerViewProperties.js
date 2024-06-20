import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
const ViewProperties = () => {
  const userId = localStorage.getItem("userId");

  const [propertyData, setPropertyData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/property/getpropertiesbyowner/${userId}`)
      .then((propertyData) => {
        setPropertyData(propertyData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navLinks = {
    postproperty: "Post Properties",
  };

  return (
    <>
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
            <span style={{ color: "#6007A2", fontSize: "70px" }}>Rent </span>
            Your Dream House with us
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
              marginTop: "-30px",
              marginBottom: "-250px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {propertyData.map((property) => {
              let statusColor =
                property.status.toLowerCase() === "open" ? "green" : "red";

              const truncatedName =
                property.name.length > 12
                  ? property.name.slice(0, 12) + "..." // Truncate text with ellipsis
                  : property.name;

              return (
                <div
                  className="col-11 col-md-6 col-lg-3 mx-0 mb-4 d-flex justify-content-center "
                  style={{
                    padding: "5px",
                    minWidth: "300px",
                    maxWidth: "300px",
                    minHeight: "350px",
                    maxHeight: "350px",
                  }}
                  key={property._id}
                >
                  <div className="card" style={{ padding: "5px" }}>
                    <img
                      className="card-img-top"
                      src={property.photourl || "broker7.jpg"}
                      alt={`Property ${property._id}`}
                      style={{
                        objectFit: "cover",
                        maxHeight: "165px",
                        minHeight: "165px",
                      }}
                    />
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h6 title={property.name}>{truncatedName}</h6>
                        <span
                          style={{
                            backgroundColor: statusColor,
                            color: "white",
                            padding: "5px 10px",

                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {property.status}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <h6>Rs.{property.price}</h6>
                        <div className="d-flex">
                          <i className="material-icons">local_hotel</i>
                          <p style={{ fontSize: "13px", paddingLeft: "8px" }}>
                            {property.bhk} BHK
                          </p>
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <i className="material-icons">place</i>
                      
                        <p
                          className="tooltip-text"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title={property.propertyDetails}
                          style={{ fontSize: "13px", paddingLeft: "8px" }}
                        >
                          {property.propertyDetails}
                        </p>
                        <i
                          className="material-icons"
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
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProperties;