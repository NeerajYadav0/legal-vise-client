import Sidebar from "@/components/core/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import MyProfile from "./MyProfile";
import { useParams } from "react-router-dom";
import Error from "../components/common/Error";
import ViewAllJobs from "./ViewAllJobs";
import ViewJob from "./ViewJob";
import AppliedJobs from "./AppliedJobs";
import ClientProfile from "./ClientProfile";
import Wishlist from "./Wishlist";
import ClientProfilePage from "./ClientProfilePage";
function Dashboard() {
  const { selection } = useParams("selection");
  const getComp = () => {
    // if (selection == "my-profile") {
    //   return <MyProfile />;
    // }
    // else if
    // else {
    //   return <Error />;
    // }
    console.log(selection);
    switch (selection) {
      case "my-profile":
        return <MyProfile />;
      case "view-all-jobs":
        return <ViewAllJobs />;
      case "viewJob":
        return <ViewJob />;
      case "client-profile":
        return <ClientProfile />;
      case "applied-job":
        return <AppliedJobs />;
      case "wishlist":
        return <Wishlist />;
      case "client-profile-page":
        return <ClientProfilePage />;

      default:
        <Error />;
    }
  };
  return (
    <div className="text-white flex gap-x-9 border-b border-slate-500">
      <div>
        <Sidebar type={localStorage.getItem("type")} />
      </div>
      {getComp()}
    </div>
  );
}

export default Dashboard;
