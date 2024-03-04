import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa";

function ViewJob() {
  const { jobId } = useParams("jobId");

  const navigate = useNavigate();

  const job = {
    _id: "65c8bc08841b8681b472e8f3",
    customerId: "65bcc4579c3fa84c53aebdc4",
    jobName: "get to know a law document",
    jobDesc: "i want to understand a file and to take some suggestions",
    category: ["litigation understanding"],
    isActive: false,
    jobPincode: 122101,
    jobLocation: "gurugram",
    pictures: [""],
    state: "haryana",
    city: "gurugram",
    createdOn: "2024-02-11T12:22:32.774Z",
    interested: [
      {
        serviceProviderId: "65bcc9cc165532df06b2c3b4",
        approxAmount: "4",
        comments: "i can do this job in 2 sittings",
      },
      {
        serviceProviderId: "65c906a3687541bd8567febf",
        approxAmount: "5",
        comments: "i can do this job in 2 sittings",
      },
    ],
  };
  const creationDate = new Date(job.createdOn);
  const differenceInMilliseconds = Date.now() - creationDate;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">View Job</h1>
      <div className="flex flex-wrap justify-evenly">
        <Card className="w-[60%] mb-10">
          <CardHeader>
            <CardTitle className="mb-3 text-center underline">
              <span className=" ">Job Title </span> : {job.jobName}
            </CardTitle>
            <CardDescription className="text-center">
              Job Categories:{" "}
              {job.category.map((subCategory, index) => {
                return (
                  <span
                    key={index}
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                      navigate(`/showJobWithTag/${subCategory}`);
                    }}
                  >
                    | {subCategory} |
                  </span>
                );
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className=" grid gap-5">
            <div className="grid justify-between w-full items-center gap-4 text-gray-600">
              <div className="flex flex-col space-y-1.5">
                State : {job.state}
              </div>
              <div className="flex flex-col space-y-1.5">City : {job.city}</div>
              <div className="flex flex-col space-y-1.5">
                Created : {differenceInDays} Days ago
              </div>
              <div className="flex flex-col space-y-1.5">
                Application Count : {job.interested.length}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Bookmark</Button>
            <Button
              onClick={() => {
                navigate(`/dashboard/viewJob/${job._id}`);
              }}
            >
              View
            </Button>
          </CardFooter>
        </Card>
        <div className=" relative w-[30%] h-[300px] flex hover:scale-110 duration-500">
          <div className="w-full h-full view-job-image rounded-lg flex justify-center text-black  "></div>
          <div className="absolute font-bold top-[40%] left-[15%] text-5xl ">
            View Images
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
