import { createContext, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const { LOGIN_API } = endpoints;

  async function login(email, password) {
    console.log("Email is", email);
    console.log("Password is", password);
    try {
      setLoading(true);
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      setLoading(false);
      setToken(response.data.token);
      toast.success("User logged in succesfully");
      console.log(response);
      console.log(token);
    } catch (error) {
      console.log(error);
      toast.error("User log in unsuccesfull");
    }
  }

  const value = {
    loading,
    setLoading,
    login,
    token,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
