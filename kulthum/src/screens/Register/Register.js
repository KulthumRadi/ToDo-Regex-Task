import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils";
import { Button, Form } from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        age: 28,
        email: "",
        password: "",
        repassword: "",
        post: "",
      },
      errors: {
        user: {
          username: "Enter First Name",
          age: "",
          email: "Email is not valid!",
          password: "Enter is not valid(min: 8, include number or character)",
          repassword: "Enter Password again",
        },
      },
      validForm: false,
      registStatus: "",
      submitted: false,
    };
  }

  validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.user.username = value.length < 1 ? "Enter User Name" : "";
        break;
      case "age":
        errors.user.age = value < 1 ? "Age is not valid" : "";
        break;
      case "email":
        errors.user.email = isValidEmail(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.user.password = !isValidPassword(value) ? `Enter is not valid(min: 8, include number or character)` : "";
        break;
      case "repassword":
        errors.user.repassword =
          value.length < 1 || value != this.state.user.password
            ? `Enter password again`
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    const user = this.state.user;
    user[name] = value;
    this.setState({ user });
    this.validationErrorMessage(event);
  };

  validateForm = (errors) => {
    let valid = true;
    Object.entries(errors.user).forEach((item) => {
      console.log(item);
      item && item[1].length > 0 && (valid = false);
    });
    return valid;
  };

  submitForm = async (event) => {
    this.setState({ submitted: true });
    const user = this.state.user;
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.log("Valid Form");

      var tmp = JSON.parse(localStorage.getItem("users"));
      var users = Array.from(tmp ? tmp : []),
        already = false;
      console.log(users);
      for (let i = 0; i < users.length; i++) {
        const item = users[i];
        if (item.email === user.email) {
          var already = true;
          break;
        }
      }
      if (!already) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        this.props.history.push("/login");
      } else {
        this.setState({
          registStatus: "This user have already registed",
        });
      }
    } else {
      console.log("Invalid Form");
    }
  };

  resetErrorMsg = () => {
    let errors = this.state.errors;
    errors.user.username = "";
    errors.user.email = "";
    this.setState({ errors });
  };

  render() {
    const { username, email, age, password, repassword, post } =
      this.state.user;

    const { submitted } = this.state;

    return (
      <div className="container mt-5">
        <div className="row mb-2">
          <div className="col-sm-2"></div>
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-6">
            <input
              type="text"
              value={username}
              name="username"
              onChange={(e) => {
                this.inputChange(e);
              }}
              className="form-control"
              placeholder="User Name"
            />
            {submitted && this.state.errors.user.username.length > 0 && (
              <span className="error">{this.state.errors.user.username}</span>
            )}
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-2"></div>
          <label
            htmlFor="formControlAgeRange"
            className="col-sm-2 col-form-label"
          >
            Age
          </label>
          <div className="col-sm-6">
            <input
              type="number"
              value={age}
              name="age"
              onChange={(e) => {
                this.inputChange(e);
              }}
              className="form-control w-100"
              placeholder="Age"
            />
            {submitted && this.state.errors.user.age.length > 0 && (
              <span className="error">{this.state.errors.user.age}</span>
            )}
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-2"></div>
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-6">
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => {
                this.inputChange(e);
              }}
              className="form-control"
              id="email"
              placeholder="xxx@gmail.com"
            />
            {submitted && this.state.errors.user.email.length > 0 && (
              <span className="error">{this.state.errors.user.email}</span>
            )}
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-2"></div>
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-6">
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => {
                this.inputChange(e);
              }}
              className="form-control"
              id="password"
              placeholder="Enter Password"
            />
            {submitted && this.state.errors.user.password.length > 0 && (
              <span className="error">{this.state.errors.user.password}</span>
            )}
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-2"></div>
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">
            Repassword
          </label>
          <div className="col-sm-6">
            <input
              type="password"
              value={repassword}
              name="repassword"
              onChange={(e) => {
                this.inputChange(e);
              }}
              className="form-control"
              id="repassword"
              placeholder="Enter password again"
            />
            {submitted && this.state.errors.user.repassword.length > 0 && (
              <span className="error">{this.state.errors.user.repassword}</span>
            )}
          </div>
          <div className="col-sm-2"></div>
        </div>
        <div className="row mb-2">
          <div className="col-sm-2"></div>
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">
            Post
          </label>
          <div className="col-sm-6">
            <Form.Select
              aria-label="Default select example"
              className="w-100"
              value={post}
              onChange={(e) => {
                this.inputChange(e);
              }}
            >
              <option value="dev">Software Developer</option>
              <option value="ceo">CEO</option>
            </Form.Select>
          </div>
          <div className="col-sm-2"></div>
        </div>
        {submitted && !this.registStatus && (
          <div className="row mb-2 mt-2 mb-2">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <span className="error">{this.state.registStatus}</span>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-2">
            <Link to={"/login"}>
              <Button className="w-100" variant="outline-primary">LOGIN</Button>
            </Link>
          </div>
          <div className="col-sm-4"></div>
          <div className="col-sm-2">
            <Button
              varient="primary"
              className="w-100"
              onClick={this.submitForm}
            >
              SIGN UP
            </Button>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }
}
