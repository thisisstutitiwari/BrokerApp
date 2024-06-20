import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <div>
          <div className="row">
            <div className="col-md-6 col-lg-5 col-12 ft-1">
              <h3>
                <span>REAL</span>ESTATE
              </h3>
              <p>
                A real estate broker is a person who has obtained a professional
                license to directly act as an intermediary in the business of
                selling, buying, and renting real estate such as houses,
                buildings, and offices.
              </p>
            </div>
            <div className="col-md-6 col-lg-3 col-12 ft-2">
              <h5>Quick Links</h5>
              <ul>
                <li className="nav-item">
                  <Link className="" to="/aboutus">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="" to="/privacy">
                    Privacy & Policy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="" to="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-4 col-12 ft-3">
              <h5>Quick Links</h5>
              <p>
                <i class="fa-solid fa-phone-volume"></i> +92 3121324083
              </p>
              <p>
                <i class="fa-solid fa-envelope"></i> forum@brokerapp.in
              </p>
              <p>
                <i class="fa-solid fa-paper-plane"></i> 374, 23rd Cross Rd,
                TriCity, IT Park, Chandigarh 133301
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Last-footer">
        <p>© 2022-23RealEstate.in</p>
      </div>
    </>
  );
};

export default Footer;