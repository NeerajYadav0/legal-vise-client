import axios from "axios";

export const axiosInstance = axios.create({});
export const apiConnector = (method, url, bodyData, headers, params) => {
  const token = localStorage.getItem("token");
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers
      ? headers
      : {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin":
            "https://legal-vise-client-nmhxqnfpk-neerajyadav0s-projects.vercel.app",
        },
    params: params ? params : null,
  });
};
