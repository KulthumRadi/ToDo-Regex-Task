import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { isValidEmail } from "../../utils";
import "./style.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "Enter Email!",
        password: "Enter Password!",
      },
      loginStatus: "",
      submitted: false,
    };
  }

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.validationErrorMessage(event);
  };

  validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.email = isValidEmail(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password = value.length < 1 ? "Enter Password" : "";
        break;
      default:
        break;
    }
    this.setState({ errors });
  };

  validateForm = (errors) => {
    let valid = true;
    Object.entries(errors).forEach((item) => {
      console.log(item);
      item && item[1].length > 0 && (valid = false);
    });
    return valid;
  };

  loginForm = async (event) => {
    this.setState({ submitted: true });
    var user = this.state;
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.info("Valid Form");
      var tmp = JSON.parse(localStorage.getItem("users"));
      var users = Array.from(tmp ? tmp : []),
        already = 0;
      console.log(users);
      for (let i = 0; i < users.length; i++) {
        const item = users[i];
        if (item.email === user.email) {
          var already = item.password;
          break;
        }
      }
      if (already) {
        if (already == user.password) {
          this.setState({
            loginStatus: "",
          });
          localStorage.setItem("user", JSON.stringify({ email: user.email }));
          this.props.history.push("/home");
        } else {
          this.setState({
            loginStatus: "Please input exact password",
          });
        }
      } else {
        this.setState({
          loginStatus: "This is an unregistered user",
        });
      }
    } else {
      console.log("Invalid Form");
    }
  };

  render() {
    const { email, password, errors, submitted } = this.state;
    return (
      <div className="pagecenter loginForm">
        <form>
          <div className="row mb-2">
            <label htmlFor="email" className="col-sm-4 col-form-label">
              Email:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                value={email}
                name="email"
                onChange={(e) => {
                  this.inputChange(e);
                }}
                className="form-control"
                id="email"
                placeholder="Email"
              />
              {submitted && errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="row mb-2">
            <label htmlFor="password" className="col-sm-4 col-form-label">
              Password:
            </label>
            <div className="col-sm-8">
              <input
                type="password"
                value={password}
                autoComplete="on"
                name="password"
                onChange={(e) => {
                  this.inputChange(e);
                }}
                className="form-control"
                id="password"
                placeholder="Password"
              />
              {submitted && errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </div>
          {submitted && !this.loginStatus && (
            <div className="row mb-2 mt-4">
              <div className="col-sm-4"></div>
              <div className="col-sm-8">
                <span className="error">{this.state.loginStatus}</span>
              </div>
            </div>
          )}
          <div className="row btn-group">
            <div className="col-sm-5">
              <button
                type="submit"
                className="button full-width"
                onClick={this.loginForm}
              >
                Login
              </button>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-5 right">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
