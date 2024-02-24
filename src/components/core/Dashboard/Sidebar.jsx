import { VscAdd, VscSignOut } from "react-icons/vsc";
import { LuView } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  return (
    <div className="flex h-full w-fit flex-col bg-black border-r border-slate-500">
      <div className=" h-full shadow-right shadow-slate-300">
        <div className="flex flex-col text-slate-400 gap-y-2 mt-16">
          <div
            className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
              location.pathname.includes("/my-profile")
                ? "bg-slate-600 text-white"
                : ""
            }`}
            onClick={() => navigate("/my-profile")}
          >
            <span
              className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                location.pathname.includes("/my-profile")
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            ></span>

            <CgProfile className="text-xl ml-7" />
            <h1>My Profile</h1>
          </div>

          <div
            className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
              location.pathname.includes("/create-job")
                ? "bg-slate-600 text-white"
                : ""
            }`}
            onClick={() => navigate("/create-job")}
          >
            <span
              className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                location.pathname.includes("/create-job")
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            ></span>
            <VscAdd className="text-xl ml-7" />
            <h1>Create Job</h1>
          </div>

          <div
            className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
              location.pathname.includes("/view-job")
                ? "bg-slate-600 text-white"
                : ""
            }`}
            onClick={() => navigate("/view-job")}
          >
            <span
              className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                location.pathname.includes("/view-job")
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            ></span>
            <LuView className="text-xl ml-7" />
            <h1>View Job</h1>
          </div>

          <div className="h-[1px] w-[180px] flex justify-center bg-white my-4"></div>

          <div
            className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
              location.pathname.includes("/wishlist")
                ? "bg-slate-600 text-white"
                : ""
            }`}
            onClick={() => navigate("/wishlist")}
          >
            <span
              className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                location.pathname.includes("/wishlist")
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            ></span>
            <CiBookmark className="text-xl ml-7" />
            <h1>Wishlist</h1>
          </div>

          <div className={`flex items-center gap-x-2 cursor-pointer p-2`}>
            <VscSignOut className="text-xl ml-7" />

            <h1>Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
