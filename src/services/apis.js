const BASE_URL = "http://localhost:8000/api/";

// AUTH ENDPOINTS
export const endpoints = {
  LOGIN_API: BASE_URL + "customer/login",
  PROFILE_DETAILS: BASE_URL + "customer/getDetails",
  SPLOGIN_API: BASE_URL + "serviceProvider/login",
  SPPROFILE_DETAILS: BASE_URL + "serviceProvider/getDetails",
  GETALLJOBS: BASE_URL + "jobs/getall",
  CREATE_JOB: BASE_URL + "jobs/create",
  CUSTOMER_JOBS: BASE_URL + "jobs/find/",
  APPLYJOB: BASE_URL + "jobs/interested",
  GETONEJOB: BASE_URL + "jobs/getOne",
  CHECKINTERESTED: BASE_URL + "jobs/checkInterested",
  GETALLAPPLIEDJOBS: BASE_URL + "serviceProvider/getAllServiceProviderJobs",
  GETCLIENTDETAILS: BASE_URL + "customer/getDetails",
  ADDWISHLIST: BASE_URL + "serviceProvider/addToWishlist",
  REMOVEWISHLIST: BASE_URL + "serviceProvider/removeFromWishlist",
  GETWISHLIST: BASE_URL + "serviceProvider/getWishlistJobs",
  GETSIMILARCLIENTS: BASE_URL + "customer/getSimilarUsers",
  GETSIMILARSP: BASE_URL + "serviceProvider/getSimilarServiceProviders",
  GETSPDETAILSBYID: BASE_URL + "serviceProvider/getDetails/",
  GET_INTERESTED_DETAILS: BASE_URL + "customer/getInterestedDetails",
  ADD_UNLOCKED: BASE_URL + "customer/add_unlocked",
  CREATE_RAZORPAY_ORDER: BASE_URL + "razorpay/create_order",
  GET_UNLOCKED_USERS: BASE_URL + "customer/get_unlocked/",
};
