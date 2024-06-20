import React from "react";

const NewBooking = () => {
  return (
    <div>
      <div className="card">
        <div className="col-12">
          <nav
            className="navbar navbar-expand-lg p-2 navbar-dark "
            style={{ backgroundColor: "#6007A2" }}
          >
            <span className="navbar-brand" style={{ fontFamily: "papyrus" }}>
              Real Estate
            </span>
            <img src="broker1.jpg" style={{ width: "30px", height: "30px" }} />
            <ul className="navbar-nav ms-auto">
              <div style={{ paddingTop: "10px" }}>
                <li className="nav-item">
                  <i
                    href="/login"
                    class="large material-icons"
                    style={{ fontSize: "40px" }}
                  >
                    search
                  </i>
                </li>
              </div>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/viewproperties">
                  View Propeerty
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/postproperty">
                  Post Property
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
