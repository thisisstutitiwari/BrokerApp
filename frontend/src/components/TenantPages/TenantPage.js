import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "../FooterStyles";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Navbar } from "../Navbar";

const navLinks = {
  tenantviewproperty: "View Properties",
  tenantpayrent: "Pay Rent",
};

const TenantPage = () => {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <h2>Welcome to RealEstate</h2>
      <div className="card">
        <CardGroup style={{ marginTop: "5%" }}>
          <Card style={{ margin: "12px" }}>
            <Card.Img
              variant="top"
              src="broker1.jpg"
              style={{ width: "100%", height: "160px", objectFit: "contain" }}
            />
            <Card.Body>
              <Link
                to="/searchproperty"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textDecoration: "none",
                }}
              >
                Search a Property
              </Link>
              <Card.Text>
                Search a property in your city from our collection
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ margin: "12px" }}>
            <Card.Img
              variant="top"
              src="broker1.jpg"
              style={{ width: "100%", height: "160px", objectFit: "contain" }}
            />
            <Card.Body>
              <Link
                to="/tenantviewproperty"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textDecoration: "none",
                }}
              >
                View Properties
              </Link>
              <Card.Text>
                View the list of all properties that you have rented
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ margin: "12px" }}>
            <Card.Img
              variant="top"
              src="broker1.jpg"
              style={{ width: "100%", height: "160px", objectFit: "contain" }}
            />
            <Card.Body>
              <Link
                to="/tenantpayrent"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textDecoration: "none",
                }}
              >
                Pay Rent
              </Link>
              <Card.Text>
                Now pay your rent using payment method provided to you
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
};

export default TenantPage;