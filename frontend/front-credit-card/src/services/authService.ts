import type { LoginResponse } from "../interfaces/authInterface";

const USER_ID_KEY = "userId";
const USERNAME_KEY= "username";

const authService = {

login(user:LoginResponse) {
    sessionStorage.setItem(USER_ID_KEY, user.userId.toString());
    sessionStorage.setItem(USERNAME_KEY, user.username);
  },

  logout() {
    sessionStorage.removeItem(USER_ID_KEY);
    sessionStorage.removeItem(USERNAME_KEY);
  },

  getUserId() {
    return sessionStorage.getItem(USER_ID_KEY);
  },

  getUsername() {
    return sessionStorage.getItem(USERNAME_KEY);
  },

}

export default authService;
