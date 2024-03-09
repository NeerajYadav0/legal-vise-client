import Sidebar from "@/components/core/Dashboard/Sidebar";
import MyProfile from "../components/core/Dashboard/MyProfile";
import { useParams } from "react-router-dom";
import Error from "../components/common/Error";
import ViewAllJobs from "../components/core/Dashboard/ViewAllJobs";
import ViewJob from "../components/core/Dashboard/ViewJob";
import CreateJob from "@/components/core/Dashboard/CreateJob";
// import ViewAllJobs from "./ViewAllJobs";
// import ViewJob from "./ViewJob";
import AppliedJobs from "./AppliedJobs";
import ClientProfile from "./ClientProfile";
import Wishlist from "./Wishlist";
import ClientProfilePage from "./ClientProfilePage";
function Dashboard() {
  const { selection } = useParams("selection");
  const getComp = () => {
    console.log(selection);
    switch (selection) {
      case "my-profile":
        return <MyProfile />;
      case "view-all-jobs":
        return <ViewAllJobs />;
      case "view-job":
        return <ViewAllJobs />;
      case "create-job":
        return <CreateJob />;
      case "viewJob":
        return <ViewJob />;
      case "user-profile":
        return <ClientProfile />;
      case "applied-job":
        return <AppliedJobs />;
      case "wishlist":
        return <Wishlist />;
      case "client-profile-page":
        return <ClientProfilePage />;
      case "search-legalist":
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
