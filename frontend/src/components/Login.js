import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        emailId,
        password,
      });
      setError("");
      if (response.data.success) {
        const userRole = response.data.user.role.toLowerCase();

        // set userId and role
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("role", userRole);

        if (userRole === "owner") {
          navigate("/ownerpage");
        } else if (userRole === "agent") {
          navigate("/agentpage");
        } else if (userRole === "tenant") {
          navigate("/tenantpage");
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };
  const navLinks = {
    signup: "Sign Up",
  };

  return (
    <div>
      <Navbar navLinks={navLinks} />

      <div
        class="col-12"
        style={{
          paddingLeft: "400px",
          paddingRight: "400px",
          paddingTop: "100px",
          paddingBottom: "80px",
        }}
      >
        <div>
          <div class="card blue-grey darken-4">
            <div class="card-content white-text">
              <span class="card-title" style={{ textAlign: "center" }}>
                Login
              </span>
              {error && <p className="text-danger">{error}</p>}
              <form className="form">
                <div className="form-group">
                  <label className="white-text" style={{ fontStyle: "bold" }}>
                    Emaild
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={emailId}
                    style={{ backgroundColor: "white" }}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group position-relative">
                  <label className="white-text" style={{ fontWeight: "bold" }}>
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      style={{ backgroundColor: "white", zIndex: 1 }}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        border: "none",
                        right: "1px",
                        top: "45%",
                        zIndex: 2,
                        background: "none",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? (
                        <i className="material-icons">visibility</i>
                      ) : (
                        <i className="material-icons">visibility_off</i>
                      )}
                    </span>
                  </div>
                </div>
                <button className="btn btn-secondary" onClick={submit}>
                  Login Here
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;