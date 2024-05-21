import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { name, updateToken } = useContext(UserContext);
  const dropdownRef = useRef(null);

  const getInitials = () => {
    const words = name.split(" ");
    const firstNameInitial = words[0][0]?.toUpperCase();
    const lastNameInitial = words[words.length - 1][0]?.toUpperCase();
    return firstNameInitial + lastNameInitial;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <div className="relative">
        <Avatar className="cursor-pointer" onClick={() => setOpen(!open)}>
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </div>
      {open && (
        <div className="absolute top-[3%] right-20 z-[1000] divide-y-[1px] divide-slate-800 overflow-hidden rounded-md border-[1px] border-slate-800 bg-slate-800">
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-yellow-100 hover:bg-slate-800 hover:text-yellow-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              localStorage.removeItem("token");
              updateToken(); // Update token in context
              navigate("/login");
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-yellow-100 hover:bg-slate-800 hover:text-yellow-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
          <div
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-yellow-100 hover:bg-slate-800 hover:text-yellow-25"
          >
            Close
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
