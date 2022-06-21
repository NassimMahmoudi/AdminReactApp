import axios from "axios";
const API_URL = "http://localhost:3000/api/admin";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("admin", JSON.stringify(response.data));
        }
       console.log(response.data)
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("admin");
  }
  register(data) {
    return axios.post(API_URL + "/register", data);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('admin'));;
  }
}
export default new AuthService();