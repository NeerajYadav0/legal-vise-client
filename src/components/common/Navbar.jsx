import { GoLaw } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { NavbarLinks } from "@/data/NavbarLinks";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="p-3 text-white justify-center items-center flex shadow-[0px_0px_5px_0px] shadow-slate-300 ">
      <div className="w-11/12 flex justify-evenly">
        <div className="w-[25%]">
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <GoLaw className="text-4xl font-semibold" />
              <span className="text-2xl font-serif font-semibold">
                {" "}
                Legal vise
              </span>
            </div>
          </Link>
        </div>
        <div className="w-[50%] flex justify-evenly items-center text-md font-semibold ">
          {NavbarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-slate-300 hover:text-slate-100 duration-200"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="w-[25%] flex gap-4 justify-center items-center">
          <Button
            className="w-[25%] h-[90%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="w-[25%] h-[90%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
