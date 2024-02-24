// import { GoLaw } from "react-icons/go";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { NavbarLinks } from "@/data/NavbarLinks";
// function Navbar() {
//   const navigate = useNavigate();
//   return (
//     <div className="p-3 text-white justify-center items-center flex shadow-[0px_0px_5px_0px] shadow-slate-300 ">
//       <div className="w-11/12 flex justify-evenly">
//         <div className="w-[25%]">
//           <Link to={"/"}>
//             <div className="flex items-center gap-3">
//               <GoLaw className="text-4xl font-semibold" />
//               <span className="text-2xl font-serif font-semibold">
//                 {" "}
//                 Legal vise
//               </span>
//             </div>
//           </Link>
//         </div>
//         <div className="w-[50%] flex justify-evenly items-center text-md font-semibold ">
//           {NavbarLinks.map((link, index) => (
//             <Link
//               key={index}
//               to={link.path}
//               className="text-slate-300 hover:text-slate-100 duration-200"
//             >
//               {link.title}
//             </Link>
//           ))}
//         </div>
//         <div className="w-[25%] flex gap-4 justify-center items-center">
//           <Button
//             className="w-[25%] h-[90%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </Button>
//           <Button
//             className="w-[25%] h-[90%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { GoLaw } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { NavbarLinks } from "@/data/NavbarLinks";

function Navbar() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState); // Toggle the state
  };

  const closeSidebar = () => {
    setShowSidebar(false); // Close the sidebar
  };
  // shadow-[0px_0px_5px_0px] shadow-slate-300
  return (
    <div className="p-3 text-white justify-center items-center flex  border-b border-slate-500">
      <div className="w-11/12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <GoLaw className="text-4xl font-semibold" />
          <span className="text-2xl font-serif font-semibold">Legal vise</span>
        </div>
        <div className="hidden md:flex justify-evenly items-center w-[80%] text-md font-semibold ">
          {NavbarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-slate-300 hover:text-slate-100 duration-200"
            >
              {link.title}
            </Link>
          ))}
          <div className="gap-x-5 flex">
            <Button
              className="bg-white text-black hover:scale-95 duration-200 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-white text-black hover:scale-95 duration-200 hover:text-white"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="flex items-center md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeSidebar}
        >
          <div className="fixed bg-black h-full w-64 p-4 top-0 left-0 shadow-lg">
            <div className="flex flex-col gap-4 ">
              {NavbarLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-slate-300 hover:text-slate-100 duration-200"
                  onClick={closeSidebar}
                >
                  {link.title}
                </Link>
              ))}
              <Button
                className="bg-white text-black hover:scale-95 duration-200 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-white text-black hover:scale-95 duration-200 hover:text-white"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
