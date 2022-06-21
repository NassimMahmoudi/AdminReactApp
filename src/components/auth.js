

import React , { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';

import { isEmail } from "validator";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
export default class Auth extends Component{
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          window.location.href="/home";
        },
        error => {
          console.log( error.message);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) || 
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const myStyle = {
      display : "block",
      width : "50%",
      'marginLeft' : "auto",
      'marginRight' : "auto",
    };
    return (
      <div className="login-form-bg h-100">
      <div className="container h-100">
          <div className="row justify-content-center h-100">
              <div className="col-xl-6">
                  <div className="form-input-content">
                      <div className="card login-form mb-0">
                          <div className="card-body pt-5">
                              <Link className="text-center" to="#"> <img src="img/logo.png" style={myStyle}/></Link>
      
                              <Form
                                onSubmit={this.handleLogin}
                                ref={c => {
                                  this.form = c;
                                }}
                              >
                                  <div className="form-group">
                                      <Input
                                        type="email" 
                                        name="username"
                                        placeholder="Email" 
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[email]}
                                        className="form-control"
                                      />
                                  </div>
                                  <div className="form-group">
                                      <Input 
                                      type="password"
                                      name="password"
                                      className="form-control"
                                      placeholder="Password"
                                      value={this.state.password}
                                      onChange={this.onChangePassword}
                                      validations={[required]}
                                    />
                                  </div>
                                  <button
                                    className="btn login-form__btn submit w-100"
                                    disabled={this.state.loading}
                                  >
                                    {this.state.loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Sign In</span>
                                  </button>
                          {this.state.message && (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {this.state.message}
                              </div>
                            </div>
                          )}
                         
                          <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                              this.checkBtn = c;
                            }}
                            />
                              </Form>
                              <p className="mt-5 login-form__footer">Dont have account? <Link to="/signup" className="text-primary">Sign Up</Link> now</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  

          );
        }
      }

