import http from "../http-common";
class RecipeDataService {
  getAll() {
    return http.get("/recipe/");
  }
  readRecipe(id) {
    return http.get(`/recipe/get-recipe/${id}`);
  }
  myRecipes(id) {
    return http.get(`/recipe/my-recipes/${id}`);
  }
  deleteRecipe(id) {
    return http.delete(`/recipe/delete-recipe/${id}`);
  }
  acceptRecipe(id) {
    return http.put(`/recipe/accept-recipe/${id}`);
  }
  searchRecipe(title) {
    return http.get(`/recipe/search/${title}`);
  }
}
export default new RecipeDataService();