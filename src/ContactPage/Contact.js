//This code was written by Yutian Chen, and modified by Wenzheng Shan.

import React from "react";
import "./Contact.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import generateDate from "../generateDate/generateDate.js";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "Leave your message here",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Contact info that stores in database
    const payload = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      phoneNum: this.state.phone,
      message:
        this.state.message === "Leave your message here"
          ? " "
          : this.state.message,
      registerDate: generateDate.formattedDate(new Date(Date.now())),
    };

    // Post to api
    axios({
      url: "/contactReq",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Contact: Data has been sent to the server!");

        //Redirect to intermeidate page
        window.location.href = "/Intermediate";
      })
      .catch(() => {
        console.log("Contact: Fail to send to the server!");
      });
  }

  render() {
    return (
      <div>
        <Header />

        <div className="contact_header"> Contact </div>

        <div align="center">
          <form className="contact_form" onSubmit={this.handleSubmit}>
            <div>
              <label>
                <strong>First Name *</strong>
              </label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>
                <strong>Last Name *</strong>
              </label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>
                <strong>Email Address</strong>
              </label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>
                <strong>Phone number *</strong>
              </label>
              <input
                name="phone"
                type="text"
                value={this.state.phone}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>
                <strong>Message</strong>
              </label>
              <textarea
                name="message"
                value={this.state.message}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Contact;
