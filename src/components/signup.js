

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
const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
export default class Signup extends Component{
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.state = {
          username: "",
          email: "",
          password: "",
          selectedfile: null,
          successful: false,
          message: ""
        };
      }
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
       onChangeFile(e) {
        this.setState({
          selectedfile: e.target.files[0]
        });
      }
      handleRegister(e) {
        e.preventDefault();
        this.setState({
          message: "",
          successful: false
        });
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
          const data = new FormData();
          data.append('file', this.state.selectedfile)
          data.append('pseudo', this.state.username)
          data.append('email', this.state.email)
          data.append('password', this.state.password)
          console.log(data)
          console.log(this.state.selectedfile)
          AuthService.register(
            data
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
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
      <div class="login-form-bg h-100">
      <div class="container h-100">
          <div class="row justify-content-center h-100">
              <div class="col-xl-6">
                  <div class="form-input-content">
                      <div class="card login-form mb-0">
                          <div class="card-body pt-5">
                              <Link class="text-center" to="#"> <img src="img/logo.png" style={myStyle}/></Link>
      
                              <Form
                                    onSubmit={this.handleRegister}
                                    className="mt-5 mb-5 login-input"
                                    ref={c => {
                                    this.form = c;
                                    }}
                                >
                                {!this.state.successful && (
                                 <div>
                                 <div class="form-group">
                                      <Input
                                        type="text"
                                        placeholder="Name"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                        /> 
                                  </div>
                                  <div class="form-group">
                                      <Input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                        />
                                  </div>
                                  <div class="form-group">
                                      <Input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                        />
                                  </div>
                                   <div class="form-group">
                                      <Input
                                        className="form-control"
                                        type="file"
                                        name="file"
                                        onChange={this.onChangeFile}
                                        />
                                  </div>
                                  <button class="btn login-form__btn submit w-100">Sign Up</button>
                                 </div>
                                 )}
                                 {this.state.message && (
                                   <div className="form-group">
                                     <div
                                       className={
                                         this.state.successful
                                           ? "alert alert-success"
                                           : "alert alert-danger"
                                       }
                                       role="alert"
                                     >
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
                              <p class="mt-5 login-form__footer">Have account <Link to="/" class="text-primary">Sign In</Link> now</p>
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


