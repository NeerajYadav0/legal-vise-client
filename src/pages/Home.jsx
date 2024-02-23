import React, { useState, useEffect } from "react";
import HighlightText from "../components/common/HighlightText";
import Autoplay from "embla-carousel-autoplay";
import video from "../assets/video/homeVideo.mp4";
import img2 from "../assets/images/Home.png";
import img3 from "../assets/images/Law.png";
import img4 from "../assets/images/Law Firm.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Home() {
  const navigate = useNavigate();
  const { loading } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center mt-24 w-11/12 mx-auto">
      <div className="w-[100%] text-center">
        <h1 className="text-white text-4xl font-bold">
          Counseling Justice: Advocating for Your Rights with{" "}
          <span>
            <HighlightText text={"Expert Legal Guidance"} />
          </span>
        </h1>
      </div>
      <div>
        <video
          src={video}
          autoPlay
          loop
          muted
          height={500}
          className="mt-16 object-cover h-96 w-[100vw] rounded-xl shadow-lg shadow-gray-900"
        ></video>
      </div>

      <div className="font-sans flex justify-between mt-32 w-11/12 h-[10%]">
        <div className="w-[50%] text-white">
          <h1 className="text-4xl mb-10 font-bold w-[80%]">
            Dedication to{" "}
            <span>
              <HighlightText text={" professionalism, integrity, excellence"} />{" "}
            </span>
          </h1>
          <p className="text-md mb-10 font-semibold w-[80%]">
            Comprehensive Legal Solutions Tailored to Your Needs. Our
            Experienced Team is Dedicated to Protecting Your Rights and
            Achieving the Best Possible Outcome for You.
          </p>
          <div className="gap-5 flex">
            <Button
              className="w-[25%] bg-white text-black hover:scale-95 duration-200 hover:text-white"
              onClick={() => navigate("/login")}
            >
              Client Portal
            </Button>
            <Button
              className="w-[25%] bg-white text-black hover:scale-95 duration-200 hover:text-white"
              onClick={() => navigate("/signup")}
            >
              Start Now
            </Button>
          </div>
        </div>
        <div className="w-1/2 ">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className=" shadow-[10px_-5px_10px_-5px] shadow-blue-200"
            opts={{
              align: "start",
              loop: true,

              // interval={5000};
            }}
          >
            <CarouselContent>
              <CarouselItem>
                <img
                  width={600}
                  src={img2}
                  alt="Image 2"
                  className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-300"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  width={600}
                  src={img3}
                  alt="Image 3"
                  className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-300"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  width={600}
                  src={img4}
                  alt="Image 4"
                  className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-300"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
            <CarouselNext className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
          </Carousel>
        </div>
      </div>

      <div className="mt-24">
        <div>{loading}</div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
