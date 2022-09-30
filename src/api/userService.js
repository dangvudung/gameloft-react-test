import axios from "axios";
import { GetAPIUrl } from ".";
const apiUrl = GetAPIUrl();

class UserService {
  async findUserInfo(name) {
    const response = await axios.get(`${apiUrl}/user?name=${name}`);
    return response;
  }

  async updateMutilUser(users) {
    const response = await axios.post(`${apiUrl}/user/update`, {
      users: users,
    });
    return response;
  }
}

export default new UserService();
