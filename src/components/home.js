import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vusername = value => {
  if (value.length < 2 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The search key must be between 3 and 50 characters.
      </div>
    );
  }
};
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveRecipes = this.retrieveRecipes.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.acceptRecipe = this.acceptRecipe.bind(this);
    this.searchRecipe = this.searchRecipe.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = {
      recipes: [],
      searchedRecipes: [],
      users: [],
      currentRecipe: null,
      currentIndex: -1,
      searchTitle: "",
      search: false,
      successful: false,
      message: ""
    };
  }
  componentDidMount() {
    this.retrieveRecipes();
    this.retrieveUsers();
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveRecipes() {
    RecipeDataService.getAll()
      .then(response => {
        
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchRecipe(search) {
    RecipeDataService.searchRecipe(search)
    .then(response => {
      console.log(response.data);
      this.setState({
        searchedRecipes: response.data,
        search : true
      });
    })
    .catch(e => {
      console.log(e);
    });
  }
  acceptRecipe(id) {
    RecipeDataService.acceptRecipe(id)
    .then(response => {
      console.log(response.data);
      this.refreshList();
    })
    .catch(e => {
      console.log(e);
    });
  }
  deleteRecipe(id) {
    RecipeDataService.deleteRecipe(id)
    .then(response => {
      console.log(response.data);
      this.refreshList();
    })
    .catch(e => {
      console.log(e);
    });
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
  getUser(id) {
    var userName= "";
    console.log('this.users')
    console.log(this.state.users)
    for (let index = 0; index < this.state.users.length; index++) {
      if( this.state.users[index]._id==id){
        userName=this.state.users[index].pseudo;
      }
      
    } 
  return userName;
  }
  refreshList() {
    this.retrieveRecipes();
    this.retrieveUsers();
    this.setState({
      currentRecipe: null,
      currentIndex: -1
    });
  }
  handleSearch(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
       let RecipeName= this.state.searchTitle;
        console.log(RecipeName)
       RecipeDataService.searchRecipe(
        RecipeName
      ).then(
        response => {
          this.setState({
            search : true,
            searchedRecipes: response.data,
          });
          console.log('searched recipe')
          console.log(response.data)
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
  searchTitle() {
    RecipeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render(){
    const { searchTitle, recipes,searchedRecipes, getUser,search, currentIndex } = this.state;
    return (
            <div>
              <section className="banner_part">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner_text">
                        <h5>yummy recipes</h5>
                          <h1>smell good feel good</h1>
                            <div className="single_sidebar_widget search_widget">
                            <Form
                              onSubmit={this.handleSearch}
                              ref={c => {
                              this.form = c;
                              }}
                            >
                                    <div className="form-group">
                                    <div className="input-group mb-3">
                                        <Input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder='Search Recipe'
                                        name="searchTitle"
                                        value={this.state.searchTitle}
                                        onChange={this.onChangeSearchTitle}
                                        validations={[required, vusername]}
                                           />
                                        <div className="input-group-append">
                                            <button className="btn" type="button"><i className="ti-search"></i></button>
                                        </div>
                                    </div>
                                    </div>
                                    <button className="button rounded-0 primary-bg text-white w-100 btn_4" type="submit">Search</button>
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
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {search ?( <div>
              <section className="exclusive_item_part blog_item_section">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5">
                      <div className="section_tittle">
                        
                        <h2>Searched recipes</h2>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                  {searchedRecipes &&
                    searchedRecipes.map((recipe, index) => (
                    <div  key={recipe._id} className="col-sm-6 col-lg-4">
                      <div className="single_blog_item">
                        <div className="single_blog_img">
                          <img src= {"http://localhost:3000"+(recipe.picture)} alt="" />
                        </div>
                        <div className="single_blog_text">
                          <h3>{recipe.name} </h3>
                          <p> # {this.getUser(recipe.posterId)}</p>
                          <br/>
                          
                          <div className="row">
                            <div className="col-sm-4">
                            <Link  className="genric-btn info circle" id="iconrecipe"  to={`/${recipe._id}`}> <i className="fa fa-info"></i></Link>
                            </div>
                            {recipe.is_accepted
        ?          <div className="col-sm-4"></div>

        :       <div className="col-sm-4"><Link  className="genric-btn success circle"   onClick={() => { if (window.confirm('Are you sure you wish to accept this recipe?')) this.acceptRecipe(recipe._id)}} id="iconrecipe" to="#"> <i className="fa fa-check"></i></Link></div>
      }
                            <div className="col-sm-4">
                            <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to delete this recipe?')) this.deleteRecipe(recipe._id)}}  to="#"> <i className="fa fa-trash"></i></Link>
                            </div>
                          </div>                        
                        </div>
                      </div>
                      <br/>                    
                    <br/>
                    
                    </div>
                    
                    ))}
                    <br/>                    
                    <br/>                    
                  </div>
                  
                </div>
              </section>
              </div>):(<div></div>
             )}
              <br/>
              <br/>
              <br/>
              <section className="exclusive_item_part blog_item_section">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5">
                      <div className="section_tittle">
                        
                      <p>Our Custumers Dishes</p>
                        <h2>Our Exclusive recipes</h2>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                  {recipes &&
                    recipes.map((recipe, index) => (
                    <div  key={recipe._id} className="col-sm-6 col-lg-4">
                      <div className="single_blog_item">
                        <div className="single_blog_img">
                          <img src= {"http://localhost:3000"+(recipe.picture)} alt="" />
                        </div>
                        <div className="single_blog_text">
                          <h3>{recipe.name} </h3>
                          <p> # {this.getUser(recipe.posterId)}</p>
                          <br/>
                          
                          <div className="row">
                            <div className="col-sm-4">
                            <Link  className="genric-btn info circle" id="iconrecipe"  to={`/${recipe._id}`}> <i className="fa fa-info"></i></Link>
                            </div>
                            {recipe.is_accepted
        ?          <div className="col-sm-4"></div>

        :       <div className="col-sm-4"><Link  className="genric-btn success circle"   onClick={() => { if (window.confirm('Are you sure you wish to accept this recipe?')) this.acceptRecipe(recipe._id)}} id="iconrecipe" to="#"> <i className="fa fa-check"></i></Link></div>
      }
                            <div className="col-sm-4">
                            <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to delete this recipe?')) this.deleteRecipe(recipe._id)}}  to="#"> <i className="fa fa-trash"></i></Link>
                            </div>
                          </div>                        
                        </div>
                      </div>
                      <br/>                    
                    <br/>
                    </div>
                    ))}   
                     <br/>                    
                    <br/>                 
                  </div>
                  
                </div>
              </section>
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
     
    
