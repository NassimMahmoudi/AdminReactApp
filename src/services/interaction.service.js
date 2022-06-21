import http from "../http-common";
class RecipeInteractionService {
  getInteractions(id) {
    return http.get(`/interaction/interaction-recipe/${id}`);
  }
}
export default new RecipeInteractionService();