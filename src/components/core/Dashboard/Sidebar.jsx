import { VscAdd, VscSignOut } from "react-icons/vsc";
import { LuView } from "react-icons/lu";
import { CiBookmark, CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt, FaWpforms } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { MdWork } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function Sidebar({ type }) {
  const { updateToken } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState); // Toggle the state
  };

  const closeSidebar = () => {
    setShowSidebar(false); // Close the sidebar
  };
  return (
    <div>
      <div className="lg:hidden flex mt-3 ml-3">
        <GiHamburgerMenu
          className={`text-2xl text-white transition-colors z-20 ${
            showSidebar ? "text-opacity-50" : "text-opacity-100"
          } cursor-pointer`}
          onClick={toggleSidebar}
        />
      </div>
      <div className="lg:flex min-h-full w-[240px] flex-col bg-black border-r border-slate-500 hidden">
        <div className="shadow-right shadow-slate-300">
          <div className="flex flex-col text-slate-400 gap-y-2 mt-16">
            {type != "admin" ? (
              <>
                <div
                  className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                    location.pathname.includes("/my-profile")
                      ? "bg-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => navigate("/dashboard/my-profile")}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                      location.pathname.includes("my-profile")
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></span>

                  <CgProfile className="text-xl ml-7" />
                  <h1>My Profile</h1>
                </div>
                {type == "client" ? (
                  <>
                    <div
                      className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                        location.pathname.includes("/create-job")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/create-job")}
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
                      onClick={() => navigate("/dashboard/view-job")}
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

                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/search-legalist")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/search-legalist")}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                          location.pathname.includes("/search-legalist")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <CiSearch className="text-xl ml-7" />
                      <h1>Search Legalist Profile</h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/view-all-job")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/view-all-jobs")}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                          location.pathname.includes("/view-all-job")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <LuView className="text-xl ml-7" />
                      <h1>View all Jobs</h1>
                    </div>

                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/applied-job")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/applied-job")}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                          location.pathname.includes("/dashboard/applied-job")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <FaWpforms className="text-xl ml-7" />
                      <h1>Applied jobs</h1>
                    </div>
                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/client-profile-page")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/client-profile-page")}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                          location.pathname.includes("/client-profile-page")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <FaUserAlt className="text-xl ml-7" />
                      <h1>Client Profile</h1>
                    </div>
                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/selected-jobs-page")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/selected-jobs-page")}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                          location.pathname.includes("/selected-jobs-page")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <MdWork className="text-xl ml-7" />
                      <h1>Selected Jobs</h1>
                    </div>
                  </>
                )}

                <div className="h-[1px] w-[180px] flex justify-center mx-auto bg-white my-4"></div>

                {type == "client" ? (
                  <div
                    className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                      location.pathname.includes("/favourite")
                        ? "bg-slate-600 text-white"
                        : ""
                    }`}
                    onClick={() => navigate("/dashboard/favourite")}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                        location.pathname.includes("/favourite")
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></span>
                    <CiBookmark className="text-xl ml-7" />
                    <h1>Favourite</h1>
                  </div>
                ) : (
                  <div
                    className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                      location.pathname.includes("/wishlist")
                        ? "bg-slate-600 text-white"
                        : ""
                    }`}
                    onClick={() => navigate("/dashboard/wishlist")}
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
                )}
              </>
            ) : (
              <>
                <div
                  className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                    location.pathname.includes("/reportedUsers")
                      ? "bg-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => navigate("/dashboard/reportedUsers")}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                      location.pathname.includes("/reportedUsers")
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></span>

                  <CgProfile className="text-xl ml-7" />
                  <h1>Reported Users</h1>
                </div>
                <div
                  className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                    location.pathname.includes("/educational-video")
                      ? "bg-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => navigate("/dashboard/educational-video")}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                      location.pathname.includes("/educational-video")
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  ></span>

                  <CgProfile className="text-xl ml-7" />
                  <h1>Add Educational Video</h1>
                </div>
              </>
            )}

            <div className={`flex items-center gap-x-2 cursor-pointer p-2`}>
              <VscSignOut className="text-xl ml-7" />

              <h1
                onClick={() => {
                  localStorage.removeItem("token");
                  updateToken(); // Update token in context
                  navigate("/login");
                }}
              >
                Logout
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      {showSidebar ? (
        <>
          <div
            className="shadow-right shadow-black shadow-2xl sticky  bg-black min-h-full lg:hidden min-w-[230px] z-10"
            onClick={closeSidebar}
          >
            <div className="flex flex-col text-slate-400 gap-y-2 mt-16">
              {type != "admin" ? (
                <>
                  <div
                    className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                      location.pathname.includes("/my-profile")
                        ? "bg-slate-600 text-white"
                        : ""
                    }`}
                    onClick={() => navigate("/dashboard/my-profile")}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                        location.pathname.includes("my-profile")
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></span>

                    <CgProfile className="text-xl ml-7" />
                    <h1>My Profile</h1>
                  </div>
                  {type == "client" ? (
                    <>
                      <div
                        className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                          location.pathname.includes("/create-job")
                            ? "bg-slate-600 text-white"
                            : ""
                        }`}
                        onClick={() => navigate("/dashboard/create-job")}
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
                        onClick={() => navigate("/dashboard/view-job")}
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

                      <div
                        className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                          location.pathname.includes("/search-legalist")
                            ? "bg-slate-600 text-white"
                            : ""
                        }`}
                        onClick={() => navigate("/dashboard/search-legalist")}
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                            location.pathname.includes("/search-legalist")
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></span>
                        <CiSearch className="text-xl ml-7" />
                        <h1>Search Legalist Profile</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                          location.pathname.includes("/view-all-job")
                            ? "bg-slate-600 text-white"
                            : ""
                        }`}
                        onClick={() => navigate("/dashboard/view-all-jobs")}
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                            location.pathname.includes("/view-all-job")
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></span>
                        <LuView className="text-xl ml-7" />
                        <h1>View all Jobs</h1>
                      </div>

                      <div
                        className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                          location.pathname.includes("/applied-job")
                            ? "bg-slate-600 text-white"
                            : ""
                        }`}
                        onClick={() => navigate("/dashboard/applied-job")}
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                            location.pathname.includes("/dashboard/applied-job")
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></span>
                        <FaWpforms className="text-xl ml-7" />
                        <h1>Applied jobs</h1>
                      </div>
                      <div
                        className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                          location.pathname.includes("/client-profile-page")
                            ? "bg-slate-600 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          navigate("/dashboard/client-profile-page")
                        }
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                            location.pathname.includes("/client-profile-page")
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></span>
                        <FaUserAlt className="text-xl ml-7" />
                        <h1>Client Profile</h1>
                      </div>
                      <div
                        className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                          location.pathname.includes("/client-profile-page")
                            ? "bg-slate-600 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          navigate("/dashboard/client-profile-page")
                        }
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                            location.pathname.includes("/client-profile-page")
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        ></span>
                        <MdWork className="text-xl ml-7" />
                        <h1>Selected Jobs</h1>
                      </div>
                    </>
                  )}

                  <div className="h-[1px] w-[180px] flex justify-center mx-auto bg-white my-4"></div>

                  {type == "client" ? (
                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/wishlist")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/wishlist")}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                          location.pathname.includes("/wishlist")
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <CiBookmark className="text-xl ml-7" />
                      <h1>Favourite</h1>
                    </div>
                  ) : (
                    <div
                      className={`relative p-2 flex items-center gap-x-2 cursor-pointer ${
                        location.pathname.includes("/wishlist")
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => navigate("/dashboard/wishlist")}
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
                  )}
                </>
              ) : (
                <>
                  <div
                    className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                      location.pathname.includes("/reportedUsers")
                        ? "bg-slate-600 text-white"
                        : ""
                    }`}
                    onClick={() => navigate("/dashboard/reportedUsers")}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                        location.pathname.includes("reportedUsers")
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></span>

                    <CgProfile className="text-xl ml-7" />
                    <h1>Reported Users</h1>
                  </div>
                  <div
                    className={`relative flex items-center gap-x-2 cursor-pointer p-2 ${
                      location.pathname.includes("/educational-video")
                        ? "bg-slate-600 text-white"
                        : ""
                    }`}
                    onClick={() => navigate("/dashboard/educational-video")}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                        location.pathname.includes("educational-video")
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></span>

                    <CgProfile className="text-xl ml-7" />
                    <h1>Add Educational Video</h1>
                  </div>
                </>
              )}

              <div className={`flex items-center gap-x-2 cursor-pointer p-2`}>
                <VscSignOut className="text-xl ml-7" />

                <h1
                  onClick={() => {
                    localStorage.removeItem("token");
                    updateToken(); // Update token in context
                    navigate("/login");
                  }}
                >
                  Logout
                </h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Sidebar;
