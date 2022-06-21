import http from "../http-common";
class UserDataService {
  getAllUsers() {
    return http.get("/user/");
  }
  userInfo(id) {
    return http.get(`/user/${id}`);
  }
  updateUser(id, data) {
    return http.put(`/user/${id}`, data);
  }
  acceptUser(id) {
    return http.put(`/user/accept-user/${id}`);
  }
  deleteUser(id) {
    return http.delete(`/user/${id}`);
  }
}
export default new UserDataService();
