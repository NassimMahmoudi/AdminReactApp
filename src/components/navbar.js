import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth.service";

  export default class Navbar extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.state = {
        currentUser: AuthService.getCurrentUser()
      };
    }
    logOut() {
      AuthService.logout();
      window.location.href="/";
    }
    render() {
      const { currentUser } = this.state;
return(
    <div>
        
      <header className="main_menu home_menu">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/home"> <img src="img/logo.png" alt="logo" /> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse main-menu-item justify-content-end" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/users">Users</Link>
                    </li>
                  </ul>
                </div>
                <div className="menu_btn">
                  <ul className="btn_1 d-none d-sm-block">
                    <li class="nav-item dropdown">
                      <Link style={ {color: "#ff6426"}} to="/profile" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fa fa-user"></i>  &nbsp; &nbsp; Profile
                      </Link>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <Link class="dropdown-item" to="/profile">User Profile</Link>
                          <Link class="dropdown-item" onClick={this.logOut} to="#">Logout</Link>
                      </div>
                  </li>
                 </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      </div>
    );
  }
}
