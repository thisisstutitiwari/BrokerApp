import React from "react";
import { Navbar } from "../Navbar";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";

const AgentPage = () => {
  const navLinks = {
    agentviewproperty: "Open Bookings",
    closedbookings: "Closed Bookings",
  };

  return (
    <div>
      <div className="col-12">
        <Navbar navLinks={navLinks} />
      </div>
      <CardGroup style={{ marginTop: "5%", marginBottom: "5%" }}>
        <Card style={{ marginLeft: "10%", marginRight: "25px" }}>
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

            <Card.Text>Explore More</Card.Text>
          </Card.Body>
          {/* <Card.Footer>
            <small className="text-muted">click</small>
          </Card.Footer> */}
        </Card>

        <Card>
          <Card.Img
            variant="top"
            src="broker7.jpg"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Link
              to="/agentviewproperty"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              Open Bookings
            </Link>

            <Card.Text>Have a Look</Card.Text>
          </Card.Body>
          {/* <Card.Footer>
            <small className="text-muted">click</small>
          </Card.Footer> */}
        </Card>

        <Card style={{ marginLeft: "15px", marginRight: "10%" }}>
          <Card.Img
            variant="top"
            src="broker6.jpg"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Link
              to="/closedbookings"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              Closed Bookings
            </Link>

            <Card.Text>Post New Propert</Card.Text>
          </Card.Body>
          {/* <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer> */}
        </Card>
      </CardGroup>
    </div>
  );
};

export default AgentPage;