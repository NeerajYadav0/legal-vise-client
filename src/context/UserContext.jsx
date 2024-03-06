import { createContext, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState({});
  const {
    LOGIN_API,
    PROFILE_DETAILS,
    SPLOGIN_API,
    SPPROFILE_DETAILS,
    CREATE_JOB,
    GETCLIENTDETAILS,
    REMOVEWISHLIST,
    ADDWISHLIST,
    GETSIMILARCLIENTS,
  } = endpoints;

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
        await apiConnector("POST", LOGIN_API, {
          email,
          password,
        }).then((res) => {
          response = res;
        });
      } else {
        await apiConnector("POST", SPLOGIN_API, {
          email,
          password,
        }).then((res) => {
          response = res;
        });
      }

      setLoading(false);
      setName(response.data.user.name);
      setToken(response.data.token);
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("type", type);
      localStorage.setItem("UserID", response?.data?.user?._id);

      toast.success("User logged in succesfully");
      toast.dismiss(toastId);
      return response;
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
  async function getDetailsById(id, type) {
    console.log("====================================");
    console.log(type);
    console.log("====================================");
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      let details = {};
      if (type == "client") {
        details = await apiConnector(
          "GET",
          `${GETCLIENTDETAILS}/${id}`,
          "",
          ""
        );
      } else {
        details = await apiConnector("POST", SPPROFILE_DETAILS, "", "");
      }
      setResponse(details);
      toast.success("User Data fetched successfully");
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);
  }
  const handelWishlist = async (setWishlist, jobId, userID, wishlist) => {
    try {
      if (wishlist) {
        await apiConnector("DELETE", REMOVEWISHLIST, {
          serviceProviderId: userID,
          id: jobId,
        });
        setWishlist(!wishlist);
      } else {
        await apiConnector("POST", ADDWISHLIST, {
          serviceProviderId: userID,
          jobId,
        });
        setWishlist(!wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarClients = async (name) => {
    try {
      await apiConnector("POST", GETSIMILARCLIENTS, {
        name,
      }).then((res) => {
        console.log(res);
        setResponse(res.data.users);
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function createJob(customerId, data) {
    const toastId = toast.loading("Loading...");
    try {
      setLoading(true);
      await apiConnector("POST", CREATE_JOB, {
        customerId: customerId,
        jobName: data.jobName,
        jobDesc: data.jobDesc,
        category: data.category,
        isActive: data.isActive === "Active" ? true : false,
        jobPincode: data.jobPincode,
        jobLocation: data.jobLocation,
        pictures: [],
        state: data.state,
        city: data.city,
      });
      toast.success("Job Created successfully");
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
    createJob,
    getDetailsById,
    handelWishlist,
    getSimilarClients,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
