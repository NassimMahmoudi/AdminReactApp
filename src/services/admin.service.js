import http from "../http-common";
class AdminDataService {
  adminInfo(id) {
    return http.get(`/admin/${id}`);
  }
}
export default new AdminDataService();
