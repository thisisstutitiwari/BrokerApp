import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Navbar } from "../Navbar";
import { Link } from "react-router-dom";
const OwnerPage = () => {
  const navLinks = {
    viewproperties: "View Properties",
    postproperty: "Post Properties",
  };

  return (
    <>
      <div className="col-12">
        <Navbar navLinks={navLinks} />
      </div>

      <CardGroup
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
     
        <Card style={{ marginRight: "30px" }}>
          <Card.Img
            variant="top"
            src="broker7.jpg"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Link
              to="/search"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              Search Properties
            </Link>
            <Card.Text>Have a Look.</Card.Text>
          </Card.Body>
          {/* <Card.Footer>
            <small className="text-muted">click</small>
          </Card.Footer> */}
        </Card>

        <Card>
          <Card.Img
            variant="top"
            src="broker6.jpg"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Link
              to="/viewproperties"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              View Properties
            </Link>
            <Card.Text>Post New Propert</Card.Text>
          </Card.Body>
          {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
        </Card>

     
        <Card style={{ marginLeft: "25px" }}>
          <Card.Img
            variant="top"
            src="broker6.jpg"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Link
              to="/postproperty"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              Post Property
            </Link>
            <Card.Text>Post New Propert</Card.Text>
          </Card.Body>
          {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
        </Card>
      </CardGroup>
    </>
  );
};

export default OwnerPage;