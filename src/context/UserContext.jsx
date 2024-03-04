import { createContext, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState({});
  const { LOGIN_API, PROFILE_DETAILS, SPLOGIN_API, SPPROFILE_DETAILS } =
    endpoints;

  async function login(email, password, type) {
    const toastId = toast.loading("Loading...");
    console.log("====================================");
    console.log(type);
    console.log("====================================");
    try {
      setLoading(true);
      localStorage.setItem("type", type);
      let response = {};
      if (type == "client") {
        response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        });
      } else {
        response = await apiConnector("POST", SPLOGIN_API, {
          email,
          password,
        });
      }

      setLoading(false);
      setName(response.data.user.name);
      setToken(response.data.token);
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("type", type);

      toast.success("User logged in succesfully");
    } catch (error) {
      console.log(error);
      toast.error("User log in unsuccesfull");
    }
    toast.dismiss(toastId);
  }

  async function getDetails(email, type) {
    console.log("====================================");
    console.log(type);
    console.log("====================================");
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      let details = {};
      if (type == "client") {
        details = await apiConnector("POST", PROFILE_DETAILS, {
          email,
        });
      } else {
        details = await apiConnector("POST", SPPROFILE_DETAILS, {
          email,
        });
      }
      setResponse(details);
      toast.success("User Data fetched successfully");
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);
  }

  const value = {
    loading,
    setLoading,
    login,
    token,
    name,
    setName,
    getDetails,
    response,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
