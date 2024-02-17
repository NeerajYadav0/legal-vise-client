import React from "react";
import sadFace from "../../assets/video/sadface.gif";

function Error() {
  return (
    <div className=" min-h-[70vh] items-center justify-center flex-col flex bg-[#f5f6f7] font-source-code-pro font-semibold">
      <div className="flex items-center gap-x-24 justify-center mb-16">
        <div>
          <img src={sadFace} width={300}></img>
        </div>
        <div className="">
          <h1 className="text-[#42494f] text-3xl">{"{ status : 404,"}</h1>
          <h1 className="text-[#42494f] text-3xl ">
            {"        message: 'Page not Found' } "}
          </h1>
        </div>
      </div>
      <div>
        <h3 className="text-[#42494f] flex justify-center">
          {"Oops! We can't find the page you were looking for."}
        </h3>
      </div>
    </div>
  );
}

export default Error;
