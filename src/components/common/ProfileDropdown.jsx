import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <div>
      <div className="relative">
        <Avatar className="cursor-pointer" onClick={() => setOpen(!open)}>
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[9%] right-20 z-[1000] divide-y-[1px] divide-slate-800 overflow-hidden rounded-md border-[1px] border-slate-800 bg-slate-800"
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-yellow-100 hover:bg-slate-800 hover:text-yellow-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-yellow-100 hover:bg-slate-800 hover:text-yellow-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
