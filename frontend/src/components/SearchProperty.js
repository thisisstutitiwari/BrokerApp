import React, { useState } from "react";
import data from "./data";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

const SearchProperty = () => {
  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };
  let dataSearch = data.cardData.filter((item) => {
    return Object.keys(item).some((key)=>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });

  const navLinks = {
    tenant: "Welcome Tenant !",
    mydetails: "My Details",
  };

  return (
    <>
      <Navbar navLinks={navLinks} />

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

          {dataSearch.map((item, index) => {
            return (
              <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                <div className="card p-0 overflow-hidden h-100 shadow">
                  <Link to={`/details/${item.id}`}>
                    <img src={item.img} className="card-img-top" />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="card-rent">{item.rent}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default SearchProperty;