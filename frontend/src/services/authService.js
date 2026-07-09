import api from "../api/axios";

export const loginUser = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const registerUser = (name, email, password, role = "Employee") => {
  return api.post("/auth/register", { name, email, password, role });
};
