import { GoLaw } from "react-icons/go";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { NavbarLinks } from "@/data/NavbarLinks";
function Navbar() {
  return (
    <div className="h-[10%] text-white bg-black  justify-center items-center flex shadow-[0px_0px_12px_0px] bg-gradient-to-r from rgba(255,255,255,1) to rgba(0,0,0,1) shadow-white ">
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
        <div className="w-[50%] flex justify-evenly items-center text-lg font-semibold">
          {NavbarLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              {link.title}
            </Link>
          ))}
        </div>
        <div className="w-[25%] flex gap-4 justify-center">
          <Button className="w-[25%]">Login</Button>
          <Button className="w-[25%]">Sign Up</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
