import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserDataService from "../services/user.service";
import Popup from 'reactjs-popup';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.acceptUser = this.acceptUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.count = this.count.bind(this);
        this.state = {
          users: [],
          currentUser: null,
          currentIndex: -1,
        };
      }
      componentDidMount() {
        this.retrieveUsers();
      }
       count(usertab) {
        return usertab.length;
      }
      retrieveUsers() {
        UserDataService.getAllUsers()
          .then(response => {
            
            this.setState({
              users: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
      refreshList() {
        this.retrieveUsers();
        this.setState({
          currentUser: null,
          currentIndex: -1
        });
      }
      setActiveTutorial(user, index) {
        this.setState({
          currentUser: user,
          currentIndex: index
        });
      }
      acceptUser(id) {
        UserDataService.acceptUser(id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      }
      deleteUser(id) {
        UserDataService.deleteUser(id)
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      
    render(){
        const { users, currentUser, currentIndex } = this.state;
        const Modal = (user) => (
          <Popup  modal nested trigger={<Link  className="" id="iconrecipe"  to="#"> <i className="fa fa-info"></i></Link>} >
            {close => (
      <div className="modalp">
        
        <div class="popup__inner">
        <button className="close" onClick={close}>
          &times;
        </button>
    <header class="popup__header">
    </header>
    <img className=" profile__image" src={"http://localhost:3000"+(user.picture)} alt="flag"/>
    
   <section class="profile__details">
    <h2 class="profile__name">{user.pseudo}</h2>
      <ul class="profile__stats">
        <li>
          <h3 class="profile_stat__heading">Followers</h3>
          <div class="profile_stat__number">{this.count(user.followers)}</div>
        </li>
       <li>
          <h3 class="profile_stat__heading">Following</h3>
          <div class="profile_stat__number">{this.count(user.following)}</div>
        </li>
        <li>
          <h3 class="profile_stat__heading">Likes</h3>
          <div class="profile_stat__number">{this.count(user.likes)}</div>
        </li>
        <li>
          <h3 class="profile_stat__heading">Dislikes</h3>
          <div class="profile_stat__number">{this.count(user.dislikes)}</div>
        </li>
      </ul>
      <div>
        <div><i className="fa fa-envelope" aria-hidden="true"></i> {user.email}</div>       
      </div>       
     
    </section>
  </div>
      </div>
    )}
          </Popup>
        );
        return (
    <div>
      
        <div className="whole-wrap">
        <div className="container box_1170">
        
			<div className="section-top-border">
                <br/>
                <br/>
                <br/>
				<h2 className="userstitle">Our Custumers List </h2>
				<div className="progress-table-wrap">
					<div className="progress-table">
						<div className="table-head">
							<div className="serial">Code</div>
							<div className="country">Pdeudo</div>
							<div className="visit">Email</div>
							<div className="percentage">Status</div>
						</div>
          {users &&
            users.map((user, index) => (
						<div   key={user._id} className="table-row">
							<div className="serial">{index+1}</div>
							<div className="country">
                 <img className="usersimg" src={"http://localhost:3000"+(user.picture)} alt="flag"/>{user.pseudo}</div>
							<div className="visit">   
               <p>{user.email}</p>    
              </div>
							<div className="percentage">
								<div className="iconscrud">                                
                {user.is_verified
        ?         <button aria-disabled className="genric-btn success small"><span className="text">Accepted</span></button>
        :       <button aria-disabled className="genric-btn primary small"><span className="text">Rejected</span></button>
      }
								</div>
                <div className="row">
                {user.is_verified
        ?          <div className="col-sm-4"></div>

        :       <div className="col-sm-4"><Link  className=""  onClick={() => { if (window.confirm('Are you sure you wish to accept this user?')) this.acceptUser(user._id)}} id="iconrecipe" to="#"> <i className="fa fa-check"></i></Link></div>
      }
                 <div className="col-sm-4">
                  
                   {Modal(user)}
                    </div>
                    <div className="col-sm-4">
                    <Link  className="" onClick={() => { if (window.confirm('Are you sure you wish to delete this user?')) this.deleteUser(user._id) } }  id="iconrecipe" to="#"> <i className="fa fa-trash"></i></Link>
                  </div>
                  </div>
							</div>
						</div>
            ))}   
					</div>
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
                        Copyright © All rights reserved <i className="ti-heart" aria-hidden="true" /> by <a href="" target="_blank">Dingo</a></p>
                    </div>
                    <div className="col-lg-4">
                    <div className="copyright_social_icon text-right">
                        <a href="#"><i className="fab fa-facebook-f" /></a>
                        <a href="#"><i className="fab fa-twitter" /></a>
                        <a href="#"><i className="ti-dribbble" /></a>
                        <a href="#"><i className="fab fa-behance" /></a>
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