import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Navbar";

const PostProperty = () => {
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bhk, setBhk] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [price, setPrice] = useState("");

  const [propertyDetails, setPropertyDetails] = useState("");
  const [photourl, setPhotoUrl] = useState("");

  const postPropertyBtn = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8000/property/postproperty", {
          userId,
          name,
          phoneNo,
          price,
          propertyDetails,
          photourl,
          bhk,
        })
        .then((result) => {
          console.log(result);
          navigate("/viewproperties");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const navLinks = {
    viewproperties: "View Properties",
  };

  return (
    <>
      <div>
        <div className="col-12">
          <Navbar navLinks={navLinks} />
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ paddingTop: "50px", marginBottom: "-100px" }}>
              <div
                className="card"
                style={{ width: "100%", height: "fit-content" }}
              >
                <form className="form">
                  <div className="row" style={{ paddingLeft: "10px" }}>
                    <div class="form-group ">
                      <label for="name">Property Name</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <div class="form-group">
                      <label for="phoneNo">Phone No</label>
                      <input
                        className="form-control"
                        id="phoneNo"
                        type="number"
                        value={phoneNo}
                        onChange={(e) => {
                          setPhoneNo(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <div class="form-group">
                      <label for="price">Price</label>
                      <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ paddingLeft: "10px" }}>
                    <div class="form-group ">
                      <label for="propertDetails">Location</label>
                      <input
                        id="propertDetails"
                        type="text"
                        value={propertyDetails}
                        onChange={(e) => {
                          setPropertyDetails(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <div class="form-group ">
                      <label for="bhk">BHK</label>
                      <input
                        id="bhk"
                        type="text"
                        value={bhk}
                        onChange={(e) => {
                          setBhk(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ paddingLeft: "10px" }}>
                    <div class="form-group ">
                      <label for="photourl">Photo Link</label>
                      <input
                        id="photourl"
                        type="text"
                        value={photourl}
                        onChange={(e) => {
                          setPhotoUrl(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="waves-effect waves-light btn-small z-depth-4 mt-2"
                      style={{
                        width: "100%",

                        backgroundColor: "#6007A2",
                      }}
                      onClick={postPropertyBtn}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostProperty;