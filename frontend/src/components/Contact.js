import React, { useState } from "react";
import "./Contact.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can use an API or send an email to the provided contact information
    // Example: sendContactForm(name, email, message);
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>
        We would love to hear from you! If you have any questions or inquiries,
        please feel free to reach out to us using the contact information
        provided below or by filling out the form.
      </p>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>
          Phone: 123-456-7890
          <br />
          Email: info@realestatebrokerapp.com
          <br />
          Address: 123 Main Street, City, State, ZIP
        </p>
        <h3>Office Hours</h3>
        <p>
          Monday to Friday: 9:00 AM - 5:00 PM
          <br />
          Saturday: 10:00 AM - 2:00 PM
          <br />
          Sunday: Closed
        </p>
      </div>
      <div className="contact-form">
        <h3>Get in Touch</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
