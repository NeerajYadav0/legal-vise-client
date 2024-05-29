import { createContext, useEffect, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import toast from "react-hot-toast";
import { Cloudinary } from "@cloudinary/url-gen";
import { useLocation, useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
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
    GET_FAV_LEGALIST,
    SELECTED_IN_JOB,
    JOB_CONFIRMATION,
    ADD_RATING,
    ELIGIBLE_RATING_USERS,
    REMOVE_FAV_LEGALIST,
    ADD_FAV_LEGALIST,
    GETDETAILSMULTIPLE,
    ADMIN_LOGIN_API,
    REPORTUSER,
    GET_ALL_REPORTED_USERS,
    GET_ALL_REPORTS_OF_USER,
    BLOCK,
    UNBLOCK,
    VIDEO_UPLOAD,
    DELETE_VIDEO,
    ALL_VIDEO,
  } = endpoints;

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setName(localStorage.getItem("name") || "");
  }, []);

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
      if (response.data.user.blocked) {
        toast.error("User log in unsuccesfull");
        toast.dismiss(toastId);
        return response;
      }
      setLoading(false);
      setName(response.data.user.name);
      setToken(response.data.token);
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("name", response?.data?.user?.name);
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
  async function adminLogin(email, password) {
    const toastId = toast.loading("Loading...");
    const type = "admin";
    setType(type);
    try {
      setLoading(true);
      localStorage.setItem("type", type);
      let response = {};

      await apiConnector("POST", ADMIN_LOGIN_API, {
        email,
        password,
      }).then((res) => {
        response = res;
      });

      setLoading(false);
      setToken(response.data.token);
      localStorage.setItem("email", response?.data?.user?.email);
      localStorage.setItem("type", type);
      localStorage.setItem("UserID", response?.data?.user?._id);
      localStorage.setItem("token", response.data.token);

      toast.success("Admin logged in succesfully");
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
      console.log(data.files);
      const formData = new FormData();
      data.files.forEach((file) => {
        formData.append("pictures", file);
      });

      formData.append("customerId", customerId);
      formData.append("jobName", data.jobName);
      formData.append("jobDesc", data.jobDesc);
      formData.append("category", data.category);
      formData.append("isActive", data.isActive === "Active" ? true : false);
      formData.append("jobPincode", data.jobPincode);
      formData.append("jobLocation", data.jobLocation);
      formData.append("state", data.state);
      formData.append("city", data.city);

      await apiConnector("POST", CREATE_JOB, formData);

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
      const type = localStorage.getItem("type");
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

  const updateProfile = async (formData) => {
    try {
      const userId = localStorage.getItem("UserID");
      let response = {};
      if (type == "client") {
        await apiConnector(
          "PUT",
          UPDATE_CUSTOMER_PROFILE + userId,
          formData
        ).then((res) => {
          response = res;
          // response = res.data.users;
        });
      } else {
        await apiConnector("PUT", UPDATE_SP_PROFILE + userId, formData).then(
          (res) => {
            response = res;
            // response = res.data.users;
          }
        );
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

  const getFavLegalist = async () => {
    const userID = localStorage.getItem("UserID");
    try {
      const res = await apiConnector("GET", GET_FAV_LEGALIST + userID);
      console.log(res.data.favServiceProvider);
      return res.data.favServiceProvider;
    } catch (err) {
      console.log(err);
      throw err; // rethrow the error to be caught in the useEffect
    }
  };

  // const addFavLegalist = async (legalistId) => {
  //   const clientId = localStorage.getItem("UserID");
  //   try {
  //     await apiConnector("GET", ADD_FAV_LEGALIST, {
  //       clientId,
  //       legalistId,
  //     }).then((res) => {
  //       console.log(res.data.favServiceProvider);
  //       return res.data.favServiceProvider;
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const removeFavLegalist = async (legalistId) => {
  //   const clientId = localStorage.getItem("UserID");
  //   try {
  //     await apiConnector("GET", REMOVE_FAV_LEGALIST, {
  //       clientId,
  //       legalistId,
  //     }).then((res) => {
  //       console.log(res.data.favServiceProvider);
  //       return res.data.favServiceProvider;
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handelFav = async (setFav, legalistId, fav) => {
    const clientId = localStorage.getItem("UserID");
    try {
      const toastId = toast.loading("Loading...");
      if (fav) {
        await apiConnector("DELETE", REMOVE_FAV_LEGALIST, {
          legalistId,
          clientId,
        });
        toast.success("Removed from Fav");
        toast.dismiss(toastId);
        setFav(!fav);
      } else {
        await apiConnector("POST", ADD_FAV_LEGALIST, {
          legalistId,
          clientId,
        });
        toast.success("Added to Fav");
        toast.dismiss(toastId);
        setFav(!fav);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const useBlockNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const blockNavigation = () => {
      // Listen to history changes
      const handlePopState = (event) => {
        navigate(location.pathname, { replace: true });
      };

      window.addEventListener("popstate", handlePopState);

      // Clean up function to remove the event listener
      const unblock = () => {
        window.removeEventListener("popstate", handlePopState);
      };

      return unblock;
    };

    return blockNavigation;
  };

  const updateToken = () => {
    setToken(localStorage.getItem("token"));
  };
  const selectJob = async (jobId, serviceProviderId) => {
    try {
      const response = await apiConnector("POST", SELECTED_IN_JOB, {
        jobId,
        serviceProviderId,
      });
      return response.data.success;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const handelConfirmation = async (jobId, serviceProviderId, setConfirm) => {
    try {
      const response = await apiConnector("POST", JOB_CONFIRMATION, {
        jobId,
        serviceProviderId,
      });
      setConfirm(true);
      return response.data.success;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const addRating = async (serviceProviderId, comment, rating) => {
    try {
      const response = await apiConnector("POST", ADD_RATING, {
        serviceProviderId,
        comment,
        rating,
        customerId: localStorage.getItem("UserID"),
      });
      alert("rating added successfully");
      return response.data.success;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const ReadyForRatingUsers = async () => {
    try {
      const response = await apiConnector(
        "GET",
        ELIGIBLE_RATING_USERS + localStorage.getItem("UserID")
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getDetailsSP = async (ids) => {
    try {
      const response = await apiConnector("POST", GETDETAILSMULTIPLE, {
        ids: ids,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const report = async (reportedUserId, comments) => {
    const toastId = toast.loading("Loading...");
    const userID = localStorage.getItem("UserID");
    const type = localStorage.getItem("type");
    try {
      const response = await apiConnector("POST", REPORTUSER, {
        reportedUserId: reportedUserId,
        reportedBy: userID,
        comments: comments,
        reportedByType: type,
      });
      console.log(response.data);
      toast.success("User Reported");
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const allReportedUsers = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("GET", GET_ALL_REPORTED_USERS);
      console.log(response.data);
      toast.success("Data Fetched");
      toast.dismiss(toastId);
      return response;
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const allReportsOfUser = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        `${GET_ALL_REPORTS_OF_USER}${id}`
      );
      console.log(response.data);
      toast.success("Data Fetched");
      toast.dismiss(toastId);
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const blockUser = async (id, type) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", BLOCK, { id, type });
      console.log(response.data);
      toast.success("User Blocked");
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const unblockUser = async (id, type) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", UNBLOCK, { id, type });
      console.log(response.data);
      toast.success("User Unblocked");
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const videoUpload = async (formData) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", VIDEO_UPLOAD, formData);
      console.log(response.data);
      toast.success("Video Uploaded");
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Error in video upload");
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const getVideo = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("GET", ALL_VIDEO);
      console.log(response.data);
      toast.success("Got all Videos");
      toast.dismiss(toastId);
      return response.data;
    } catch (error) {
      toast.error("Error in getting video");
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const deleteVideo = async (id) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_VIDEO + id);
      console.log(response.data);
      toast.success("Deleted Video");
      toast.dismiss(toastId);
      return response.data;
    } catch (error) {
      toast.error("Error in deleting video");
      toast.dismiss(toastId);
      console.error(error);
    }
  };
  const value = {
    ReadyForRatingUsers,
    handelConfirmation,
    selectJob,
    useBlockNavigation,
    updateToken,
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
    getFavLegalist,
    addRating,
    setResponse,
    handelFav,
    getDetailsSP,
    adminLogin,
    report,
    allReportedUsers,
    allReportsOfUser,
    unblockUser,
    blockUser,
    videoUpload,
    getVideo,
    deleteVideo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
