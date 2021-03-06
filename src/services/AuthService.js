import ApiService from "./ApiService";

const ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "api/auth/logout"
};

class AuthService extends ApiService {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    const token = this.getToken();
    const user = this.getUser();

    if (token && user) {
      this.setAuthorizationHeader();

      this.api.setUnauthorizedCallback(this.destroySession.bind(this));
    }
  };

  setAuthorizationHeader = () => {
    const token = this.getToken();
    if (token) {
      this.api.attachHeaders({
        Authorization: `Bearer ${token}`
      });
    }
  };

  createSession = user => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setAuthorizationHeader();
  };

  destroySession = () => {
    localStorage.clear();
    this.api.removeHeaders(["Authorization"]);
  };

  login = async loginData => {
    const { data } = await this.apiClient.post(ENDPOINTS.LOGIN, loginData);
    this.createSession(data);
    return data;
  };

  register = async signupData => {
    const { data } = await this.apiClient.post(ENDPOINTS.REGISTER, signupData);

    return data;
  };

  logout = async () => {
    try {
      const { data } = await this.apiClient.post(ENDPOINTS.LOGOUT);
      this.destroySession();
      return { ok: true, data };
    } catch {
      this.destroySession();
      return false;
    }
  };

  getToken = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).access_token : undefined;
  };

  isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.access_token ? true : false;
  };

  getUser = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  };

  updateUserInStorage = property => {
    const user = localStorage.getItem("user");
    let jsonUser = JSON.parse(user);
    jsonUser = { ...jsonUser, ...property };
    localStorage.setItem("user", JSON.stringify(jsonUser));
  };
}

export const authService = new AuthService();
export default AuthService;
