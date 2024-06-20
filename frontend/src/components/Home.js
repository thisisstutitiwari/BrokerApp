import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Navbar, handleLogout } from "./Navbar";
import Building1 from "./imgs/building1.jpg";
import Building2 from "./imgs/building3.jpg";
import Building3 from "./imgs/building2.jpg";
const Home = () => {
  const navLinks = {
    signup: "Sign Up",
  };
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  return (
    <div>
      {userId ? <Navbar /> : <Navbar navLinks={navLinks} />}

      <div className="card">
        <CardGroup style={{ marginTop: "5%", marginBottom: "-1%" }}>
          <Card style={{ margin: "12px" }}>
            <Card.Img
              variant="top"
              src={Building1}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
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
                Search Properties
              </Link>
              <Card.Text>
                Provide the filter of Cities and get properties in your budget.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
            <small className="text-muted">click</small>
          </Card.Footer> */}
          </Card>
          {userId && (
            <Card style={{ margin: "12px" }}>
              <Card.Img
                variant="top"
                src={Building2}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Link
                  to={`/${role}page`}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textDecoration: "none",
                  }}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Page
                </Link>
                <Card.Text>
                  Provide the filter of Cities and get properties in your
                  budget.
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          {/* <Card.Footer>
            <small className="text-muted">click</small>
          </Card.Footer> */}
          {!userId && (
            <Card style={{ margin: "12px" }}>
              <Card.Img
                variant="top"
                src={Building2}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />

              <Card.Body>
                <Link
                  to="/signup"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </Link>
                <Card.Text>Not a member yet? SignUp and join us. </Card.Text>
              </Card.Body>

              {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
            </Card>
          )}
          <Card style={{ margin: "12px" }}>
            <Card.Img
              variant="top"
              src={Building3}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            {!userId ? (
              <Card.Body>
                <Link
                  to="/login"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
                <Card.Text>
                  Directly login with your existing account.
                </Card.Text>
              </Card.Body>
            ) : (
              <Card.Body>
                <Link
                  onClick={handleLogout}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textDecoration: "none",
                  }}
                >
                  Logout
                </Link>
                <Card.Text>Hope we see you again.</Card.Text>
              </Card.Body>
            )}
            {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
          </Card>
        </CardGroup>
      </div>
      {/* <Box>
        <Container>
          <Row>
            <Column>
              <Heading href="/AboutUs">About Us</Heading>
              <FooterLink href="#">Aim</FooterLink>
              <FooterLink href="#">Vision</FooterLink>
              <FooterLink href="#">Testimonials</FooterLink>
            </Column>
            <Column>
              <Heading> Privacy Policy</Heading>
              <FooterLink href="#">Terms and conditions</FooterLink>
              <FooterLink href="#">Privacy Notice</FooterLink>
            </Column>
            <Column>
              <Heading href="/contactus">Contact Us</Heading>

              <FooterLink>9295020395</FooterLink>
              <footerlink>broker@gmail.com</FooterLink>
              <FooterLink>Chandigarh (headoffice)</FooterLink>
            </Column>
            <Column>
              <Heading>Social Media</Heading>
              <FooterLink href="#">
                <i className="fab fa-facebook-f">
                  <span style={{ marginLeft: "10px" }}>Facebook</span>
                </i>
              </FooterLink>
              <FooterLink href="#">
                <i className="fab fa-instagram">
                  <span style={{ marginLeft: "10px" }}>Instagram</span>
                </i>
              </FooterLink>
              <FooterLink href="#">
                <i className="fab fa-twitter">
                  <span style={{ marginLeft: "10px" }}>Twitter</span>
                </i>
              </FooterLink>
              <FooterLink href="#">
                <i className="fab fa-youtube">
                  <span style={{ marginLeft: "10px" }}>Youtube</span>
                </i>
              </FooterLink>
            </Column>
          </Row>
        </Container>
      </Box> */}
    </div>
  );
};

export default Home;