import { createContext, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
// import Razorpay from "razorpay";
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    GETSIMILARSP,
    GETSPDETAILSBYID,
    GET_INTERESTED_DETAILS,
    CREATE_RAZORPAY_ORDER,
    ADD_UNLOCKED,
    GET_UNLOCKED_USERS,
    SP_PASSWORD_CHANGE,
    CUSTOMER_PASSWORD_CHANGE,
    UPDATE_SP_PROFILE,
    UPDATE_CUSTOMER_PROFILE,
    CHANGE_JOB_STATUS,
  } = endpoints;

  async function login(email, password, type) {
    const toastId = toast.loading("Loading...");
    setType(type);
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
      localStorage.setItem("token", response.data.token);

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
      // setResponse(details);
      toast.success("User Data fetched successfully");
      toast.dismiss(toastId);
      return details;
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
        details = await apiConnector("GET", GETSPDETAILSBYID + id, "", "");
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

  const getSimilarUsers = async (name, type) => {
    try {
      let response = [];
      if (type == "client") {
        await apiConnector("POST", GETSIMILARSP, {
          name,
        }).then((res) => {
          response = res.data.users;
        });
      } else {
        await apiConnector("POST", GETSIMILARCLIENTS, {
          name,
        }).then((res) => {
          response = res.data.users;
        });
      }

      return response;
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

  async function getInterestedDetails(interested, unlocked) {
    try {
      const anotherRes = await apiConnector(
        "POST",
        GET_INTERESTED_DETAILS,
        { interested: interested, unlocked: unlocked },
        "",
        ""
      ).then((res) => {
        console.log(res);
        return res;
      });
      return anotherRes;
    } catch (error) {
      console.log(error);
    }
  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handelRazorpay(id, name, getUnlocked) {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        );
        return;
      }

      const orderResponse = await apiConnector(
        "POST",
        CREATE_RAZORPAY_ORDER,
        { amount: 10 },
        "",
        ""
      );

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }

      console.log(
        "PAYMENT RESPONSE FROM BACKEND............",
        orderResponse.data
      );

      // Opening the Razorpay SDK
      const options = {
        key: "rzp_test_85rvu2U49NJ1ad",
        currency: orderResponse.data.paymentRespose.currency,
        amount: `${orderResponse.data.paymentRespose.amount}`,
        order_id: orderResponse.data.paymentRespose.id,
        name: "Legal Vise",
        description: "Thank you for unlocking the legalist.",
        image: "",
        prefill: {
          name: "neeraj",
          email: "neerajyadav@email",
        },
        handler: function (response) {
          // sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
          // verifyPayment({ ...response, courses }, token, navigate, dispatch)
          addInUnlocked(id, name).then(() => {
            getUnlocked();
          });

          alert("payment done");
        },
        theme: {
          color: "#000",
        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.");
        console.log(response.error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function addInUnlocked(id, name) {
    try {
      if (type == "client") {
        const userID = localStorage.getItem("UserID");
        await apiConnector("POST", ADD_UNLOCKED, {
          clientId: userID,
          serviceProviderId: id,
        }).then((res) => {
          console.log(res);
          alert(`Congratulations you unlocked ${name}`);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getUnlockedUsers() {
    try {
      let data = [];
      if (type == "client") {
        const userID = localStorage.getItem("UserID");
        await apiConnector("GET", GET_UNLOCKED_USERS + userID, {}).then(
          (res) => {
            data = res;
          }
        );
        return data?.data?.unlockedUsers;
      }
    } catch (error) {
      console.log(error);
    }
  }
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const userId = localStorage.getItem("UserID");
      let response = {};
      if (type == "client") {
        await apiConnector("POST", CUSTOMER_PASSWORD_CHANGE, {
          currentPassword: currentPassword,
          userId: userId,
          newPassword: newPassword,
        }).then((res) => {
          response = res;
          // response = res.data.users;
        });
      } else {
        await apiConnector("POST", SP_PASSWORD_CHANGE, {
          currentPassword: currentPassword,
          userId: userId,
          newPassword: newPassword,
        }).then((res) => {
          response = res;
          // response = res.data.users;
        });
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const userId = localStorage.getItem("UserID");
      let response = {};
      if (type == "client") {
        await apiConnector("PUT", UPDATE_CUSTOMER_PROFILE + userId, {
          ...profileData,
        }).then((res) => {
          response = res;
          // response = res.data.users;
        });
      } else {
        await apiConnector("PUT", UPDATE_SP_PROFILE + userId, {
          ...profileData,
        }).then((res) => {
          response = res;
          // response = res.data.users;
        });
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const changeJobStatus = async (jobId) => {
    try {
      await apiConnector("PUT", CHANGE_JOB_STATUS + jobId, {}).then((res) => {
        return res.data.success;
        // response = res.data.users;
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

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
    getSimilarUsers,
    getInterestedDetails,
    type,
    handelRazorpay,
    getUnlockedUsers,
    changePassword,
    updateProfile,
    changeJobStatus,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
