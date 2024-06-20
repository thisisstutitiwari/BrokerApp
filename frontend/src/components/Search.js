import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import axios from "axios";

const Search = () => {
  const [filter, setFilter] = useState("");
  const [propertyData, setPropertyData] = useState([]);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:8000/property/getproperties")
      .then((propertyData) => {
        setPropertyData(propertyData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const book = (id)=> {
    const url = `http://localhost:8000/property/bookproperty/${id}/${userId}`;
    axios
      .post(url)
      .then((res) => {
        console.log("propertyinfo", res.data);
        setData(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchText = (event) => {
    setFilter(event.target.value);
  };
  let dataSearch = propertyData.filter((item) => {
    return Object.keys(item).some((key) => {
      const itemValue = item[key];
      if (typeof itemValue === 'string') {
        return itemValue
          .toLowerCase()
          .includes(filter.toLowerCase());
      }
      return false; 
    });
  });

  return (
    <>
      <Navbar />

      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12 mb-5">
            <div className="mb-3 col-4 mx-auto text-center">
              <label className="form-lable h4">Search</label>
              <input
                type="text"
                placeholder="Filter by city name"
                className="from-control"
                value={filter}
                onChange={searchText.bind(this)}
              />
            </div>
          </div>

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
            {dataSearch.map((property) => {
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
                          onClick={() => book(property._id)}
                          className="btn btn-small"
                          style={{
                            backgroundColor: "#6007A2",
                            visibility:
                              role === ("tenant")
                                ? "visible"
                                : "hidden",
                            color: "white",
                            width: "100px",
                          }}
                          disabled={property.status === "closed"}
                        >
                          Book
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
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Search;