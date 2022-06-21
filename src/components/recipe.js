import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import RecipeDataService from "../services/recipe.service";
import UserDataService from "../services/user.service";
import RecipeInteractionService from "../services/interaction.service";
import withRouter from "../withRouter";
class Recipe extends Component {
   constructor(props) {
      super(props);
      this.getRecipe = this.getRecipe.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.acceptRecipe = this.acceptRecipe.bind(this);
      this.deleteRecipe = this.deleteRecipe.bind(this);
      this.getInteractions = this.getInteractions.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.getUser = this.getUser.bind(this);
      this.getUserPic = this.getUserPic.bind(this);
      this.myRecipes = this.myRecipes.bind(this);
      this.count = this.count.bind(this);
      this.state = {
         posterId: '',
         users: [],
         recipes: [],
         likes: [],
         dislikes: [],
         comments: [],
         interaction: {},
        currentRecipe: {},
      };
    }
    componentDidMount() {
         const id =this.props.params.recipe
         console.log(id);
         this.getRecipe(id);
         this.getInteractions(id);
         this.retrieveUsers();
    }
    getRecipe(id) {
      RecipeDataService.readRecipe(id)
      .then(response => {
         this.setState({
            currentRecipe: response.data,
            posterId: response.data.posterId
          });
      })
      .catch(e => {
        console.log(e);
      });
    }
    myRecipes(id_user) {
      RecipeDataService.myRecipes(id_user)
      .then(response => {
         this.setState({
            recipes: response.data
          });
      })
      .catch(e => {
        console.log(e);
      });
    }
    getInteractions(id) {
      RecipeInteractionService.getInteractions(id)
      .then(response => {
         this.setState({
            interaction: response.data,
            likes: response.data.likes,
            dislikes: response.data.dislikes,
            comments: response.data.comments
          });
          console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    acceptRecipe(id) {
      RecipeDataService.acceptRecipe(id)
      .then(response => {
        console.log(response.data);
        this.refreshList(id);
      })
      .catch(e => {
        console.log(e);
      });
    }
    count(usertab) {
      return usertab.length;
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
      for (let index = 0; index < this.state.users.length; index++) {
        if( this.state.users[index]._id==id){
          userName=this.state.users[index].pseudo;
        }
      } 
    return userName;
    }
    getUserPic(id) {
      var picture= "";
      for (let index = 0; index < this.state.users.length; index++) {
        if( this.state.users[index]._id==id){
         picture=this.state.users[index].picture;
        }
      } 
    return picture;
    }
     convertISOStringToMonthDay = date => {
      const tempDate = new Date(date).toString().split(' ');
      const formattedDate = `${tempDate[3]} ${+tempDate[2]} ${tempDate[1]}`;
      return formattedDate;
    };
    refreshList(id) {
      this.getRecipe(id);
    }
  
    render(){
      const { currentRecipe,interaction,likes,dislikes,comments,recipes,posterId } = this.state;
      this.myRecipes(posterId);
      const mystyle = {
         width : "150px",
         height : "150px"
       };
    return (
      <div>
        <section className="breadcrumb breadcrumb_bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb_iner text-center">
                  <div className="breadcrumb_iner_item">
                    <h2>Food recipe</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="blog_area single-post-area section_padding">
      <div className="container">
         <div className="row">
            <div className="col-lg-8 posts-list">
               <div className="single-post">
                  <div className="feature-img">
                     <img className="img-fluid" style={{width: "-webkit-fill-available"}} src={"http://localhost:3000"+(currentRecipe.picture)} alt=""/>
                  </div>
                  <div className="blog_details">
                                   
                     <div className="blog-author">
                  <div className="media align-items-center">
                     <img src={"http://localhost:3000"+(this.getUserPic(currentRecipe.posterId))} alt=""/>
                     <div className="media-body">
                        <a href="#">
                           <h2> # {this.getUser(currentRecipe.posterId)}</h2>
                           <h2>{currentRecipe.name}</h2>
                     <h3>created at : {this.convertISOStringToMonthDay(currentRecipe.createdAt)}</h3>     
                        </a>
                     </div>
                  </div>
               </div>
                     <div className="quote-wrapper">
                        <div className="quotes">
                        {currentRecipe.description}.
                        </div>
                     </div>
                     
                  </div>
               </div>
               <div className="navigation-top">
               <div className="row">
                          
                            <div className="col-sm-4">
                            <Link  className="genric-btn primary circle" id="iconrecipe" onClick={() => { if (window.confirm('Are you sure you wish to delete this recipe?')) this.deleteRecipe(currentRecipe._id)}}   to="#"> <i className="fa fa-trash"></i></Link>
                            </div>
                            {currentRecipe.is_accepted
        ?          <div className="col-sm-4"></div>

        :       <div className="col-sm-4"><Link  className="genric-btn success circle"   onClick={() => { if (window.confirm('Are you sure you wish to accept this recipe?')) this.acceptRecipe(currentRecipe._id)}} id="iconrecipe" to="#"> <i className="fa fa-check"></i></Link></div>
      }
                            
                          </div>
                  <div className="d-sm-flex justify-content-between text-center">
                     <ul className="blog-info-link mt-3 mb-4">
                        <li><a href="#"><i className="far fa-heart"></i>{this.count(likes)} Likes</a></li>
                        <li><a href="#"><i className="far fa-user"></i> {this.count(dislikes)} Dislikes</a></li>
                        <li><a href="#"><i className="far fa-comments"></i> {this.count(comments)} Comments</a></li>
                     </ul>
                  </div>
               </div>

               <div className="comments-area">
                  <h4>Comments</h4>
                  {comments &&
                    comments.map((comment, index) => (
                  <div  key={comment._id} className="comment-list">
                     <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                           <div className="thumb">
                              <img src= {"http://localhost:3000"+(comment.commenterPhoto)} alt=""/>
                           </div>
                           <div className="desc">
                              <p className="comment">
                                {comment.text}
                                </p>
                              <div className="d-flex justify-content-between">
                                 <div className="d-flex align-items-center">
                                    <h5>
                                       <a to="#"> # {comment.commenterPseudo}</a>
                                    </h5>
                                    <p className="date"> {this.convertISOStringToMonthDay(comment.timestamp)} </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                   ))} 
                  
               </div>
            </div>
            <div className="col-lg-4">
               <div className="blog_right_sidebar">
                  <aside className="single_sidebar_widget popular_post_widget">
                     <h3 className="widget_title">Same author</h3>
                    
                     {recipes &&
                    recipes.map((recipe, index) => (
                     <div key={recipe._id} className="media post_item">
                        <img style={mystyle} src= {"http://localhost:3000"+(recipe.picture)} alt="post"/>
                        <div className="media-body">
                           <a onClick={() => {(window.location.href=`/${recipe._id}`)}} to={`/${recipe._id}`}>
                              <h3>{recipe.name}</h3>
                           </a>
                           <p>{this.convertISOStringToMonthDay(recipe.createdAt)}</p>
                        </div>
                     </div>
                     ))} 
                     
                    
                  </aside>
               </div>
            </div>
         </div>
      </div>
   </section>
  <footer className="footer-area">
    <div className="container">
      <div className="copyright_part_text">
        <div className="row">
          <div className="col-lg-8">
            <p className="footer-text m-0">
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved {" "}
              <i className="ti-heart" aria-hidden="true" /> by{" "}
              <a href="#" target="_blank">
                Dingo
              </a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
          <div className="col-lg-4">
            <div className="copyright_social_icon text-right">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="ti-dribbble" />
              </a>
              <a href="#">
                <i className="fab fa-behance" />
              </a>
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
export default withRouter(Recipe)