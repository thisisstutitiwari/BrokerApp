import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ViewProperties from "./components/OwnerPages/OwnerViewProperties";
import PostProperty from "./components/OwnerPages/OwnerPostProperty";
import OwnerPage from "./components/OwnerPages/OwnerPage";
import AgentPage from "./components/AgentPages/AgentPage";
import TenantPage from "./components/TenantPages/TenantPage";
import Footer from "./components/Footer";
import NewBooking from "./components/NewBooking";
import AgentViewProperty from "./components/AgentPages/AgentViewProperty";
import Closedbookings from "./components/AgentPages/AgentClosedbookings";
import Search from "./components/Search";
import SearchProperty from "./components/SearchProperty";
import Mydetails from "./components/Mydetails";
import EditDetails from "./components/EditDetails";
import AboutUs from "./components/About";
import PrivacyPolicy from "./components/Privacy";
import { ProtectedRoute, AuthProtect } from "./ProtectedRoute";
import ContactUs from "./components/Contact";
import TenantViewProperty from "./components/TenantPages/TenantViewProperty";
import TenantPayRent from "./components/TenantPages/TenantPayRent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthProtect element={<Login />} />} />
        <Route path="/signup" element={<AuthProtect element={<SignUp />} />} />

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/searchproperty" element={<SearchProperty />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/mydetails"
          element={<ProtectedRoute element={<Mydetails />} fallback="/" />}
        />
        <Route
          path="/editdetails"
          element={<ProtectedRoute element={<EditDetails />} fallback="/" />}
        />
        <Route
          path="/newbooking"
          element={<ProtectedRoute element={<NewBooking />} fallback="/" />}
        />

        <Route
          path="/tenantpage"
          element={
            <ProtectedRoute
              element={<TenantPage />}
              roles={["tenant"]}
              fallback="/"
            />
          }
        />
        <Route
          path="/tenantviewproperty"
          element={
            <ProtectedRoute
              element={<TenantViewProperty />}
              roles={["tenant"]}
              fallback="/"
            />
          }
        />
        <Route
          path="/tenantpayrent"
          element={
            <ProtectedRoute
              element={<TenantPayRent />}
              roles={["tenant"]}
              fallback="/"
            />
          }
        />
\
        <Route
          path="/ownerpage"
          element={
            <ProtectedRoute
              element={<OwnerPage />}
              roles={["owner"]}
              fallback="/"
            />
          }
        />
        <Route
          path="/viewproperties"
          element={
            <ProtectedRoute
              element={<ViewProperties />}
              roles={["owner"]}
              fallback="/"
            />
          }
        />
        <Route
          path="/postproperty"
          element={
            <ProtectedRoute
              element={<PostProperty />}
              roles={["owner"]}
              fallback="/"
            />
          }
        />

        <Route
          path="/agentpage"
          element={
            <ProtectedRoute
              element={<AgentPage />}
              roles={["agent"]}
              fallback="/"
            />
          }
        />
        <Route
          path="/agentviewproperty"
          element={
            <ProtectedRoute
              element={<AgentViewProperty />}
              roles={["agent"]}
              fallback="/"
            />
          }
        />
        <Route
          path="/closedbookings"
          element={
            <ProtectedRoute
              element={<Closedbookings />}
              roles={["agent"]}
              fallback="/"
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;