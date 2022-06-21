import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import AdminDataService from "../services/admin.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      user : {},
    };
  }
  componentDidMount() {
    const user =AuthService.getCurrentUser();
    console.log(user);
    this.getUser(user.id);
}
count(usertab) {
  return usertab.length;
}
getUser(id) {
  AdminDataService.adminInfo(id)
 .then(response => {
    this.setState({
      user: response.data,
     });
 })
 .catch(e => {
   console.log(e);
 });
}
  render() {
    const { currentUser,user } = this.state;
    const mystyle = {
      "fontSize" : "24px",
      "textTransform" : "capitalize",
       color : "#ff6426",
      "fontStyle" : "italic",
      "fontWeight" : "400",
      "fontFamily" : "Lora, serif",
      "marginBottom" : "25px",
    };
    return (
      <div>
        <section className="breadcrumb breadcrumb_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_iner text-center">
                  <div className="breadcrumb_iner_item">
                    <h2>Welcome { currentUser.pseudo } </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <div className="container">

      <div class="section-top-border">
				<h2 style={mystyle} class="mb-30">Admin Profile:</h2>
				<div class="row">
					<div class="col-md-3">
						<img src={"http://localhost:3000"+(user.picture)} alt="" class="img-fluid"/>
					</div>
					<div class="col-md-9 mt-sm-20">
            <ul className="unordered-list">
              <li>
                <div className="row">
                  <div class="col-md-4">
                    <h2>Admin Name :</h2>
                  </div>
                  <div class="col-md-4">
                    <h2><i className="fa fa-user" aria-hidden="true"></i> {user.pseudo}</h2>
                  </div>
                </div>
              </li><li>
                <div className="row">
                  <div class="col-md-4">
                    <h2>Admin Email :</h2>
                  </div> 
                  <div class="col-md-4">
                    <h2><i className="fa fa-envelope" aria-hidden="true"></i> {user.email}</h2>
                  </div>
                </div>
              </li>
            </ul>
						
					</div>
				</div>
			</div>
      </div>
      <footer className="footer-area">
                <div className="container">
                  <div className="copyright_part_text">
                    <div className="row">
                      <div className="col-lg-8">
                        <p className="footer-text m-0">
                          Copyright © All rights reserved <i className="ti-heart" aria-hidden="true" /> by <a to="#" target="_blank">Dingo</a></p>
                      </div>
                      <div className="col-lg-4">
                        <div className="copyright_social_icon text-right">
                          <a to="#"><i className="fab fa-facebook-f" /></a>
                          <a to="#"><i className="fab fa-twitter" /></a>
                          <a to="#"><i className="ti-dribbble" /></a>
                          <a to="#"><i className="fab fa-behance" /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
      </div>
    );
  }
}