import { useContext } from "react";
import { AuthContext } from "../context/AuthProviderContext";

export function useAuth() {
  return useContext(AuthContext);
}
