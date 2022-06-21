import React, { Component }  from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Signup from "./components/signup";
import Recipe from "./components/recipe";
import Users from "./components/users";
import Auth from "./components/auth";
import Profile from "./components/profile";
import AuthService from "./services/auth.service";

import {BrowserRouter as Router ,Route ,Routes} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentAdmin: undefined,
    };
  }
  componentDidMount() {
    const admin = AuthService.getCurrentUser();
    if (admin) {
      this.setState({
        currentAdmin: admin,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentAdmin} = this.state;
  
  return (
    
    

        <Router>
          {currentAdmin ?(    
        <Navbar/>
          ): (<div></div> )}
          
        <Routes>  
        
        <Route  path="/" element={<Auth/>}/>
        <Route  path="/home" element={<Home/>}/>
        <Route  path="/users" element={<Users/>}/>
        <Route  path="/signup" element={<Signup/>}/>
        <Route  path="/profile" element={<Profile/>}/>
        <Route  path="/:recipe" element={<Recipe/>}/>



        </Routes>
      

        </Router>
        


        
  );
}
}
export default App;