import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import JobCard from "@/components/common/JobCard";

function AppliedJobs() {
  //   const jobs = [
  //     {
  //       _id: "65c8bc08841b8681b472e8f3",
  //       customerId: "65bcc4579c3fa84c53aebdc4",
  //       jobName: "get to know a law document",
  //       jobDesc: "i want to understand a file and to take some suggestions",
  //       category: ["litigation understanding"],
  //       isActive: false,
  //       jobPincode: 122101,
  //       jobLocation: "gurugram",
  //       pictures: [""],
  //       state: "haryana",
  //       city: "gurugram",
  //       createdOn: "2024-02-11T12:22:32.774Z",
  //       interested: [
  //         {
  //           serviceProviderId: "65bcc9cc165532df06b2c3b4",
  //           approxAmount: "4",
  //           comments: "i can do this job in 2 sittings",
  //         },
  //         {
  //           serviceProviderId: "65c906a3687541bd8567febf",
  //           approxAmount: "5",
  //           comments: "i can do this job in 2 sittings",
  //         },
  //       ],
  //     },
  //     {
  //       _id: "65c8bc08841b8681b472e8f3",
  //       customerId: "65bcc4579c3fa84c53aebdc4",
  //       jobName: "get to know a law document",
  //       jobDesc: "i want to understand a file and to take some suggestions",
  //       category: ["litigation understanding"],
  //       isActive: false,
  //       jobPincode: 122101,
  //       jobLocation: "gurugram",
  //       pictures: [""],
  //       state: "haryana",
  //       city: "gurugram",
  //       createdOn: "2024-02-11T12:22:32.774Z",
  //       interested: [
  //         {
  //           serviceProviderId: "65bcc9cc165532df06b2c3b4",
  //           approxAmount: "4",
  //           comments: "i can do this job in 2 sittings",
  //         },
  //         {
  //           serviceProviderId: "65c906a3687541bd8567febf",
  //           approxAmount: "5",
  //           comments: "i can do this job in 2 sittings",
  //         },
  //       ],
  //     },
  //     {
  //       _id: "65c8bc08841b8681b472e8f3",
  //       customerId: "65bcc4579c3fa84c53aebdc4",
  //       jobName: "get to know a law document",
  //       jobDesc: "i want to understand a file and to take some suggestions",
  //       category: ["litigation understanding"],
  //       isActive: false,
  //       jobPincode: 122101,
  //       jobLocation: "gurugram",
  //       pictures: [""],
  //       state: "haryana",
  //       city: "gurugram",
  //       createdOn: "2024-02-11T12:22:32.774Z",
  //       interested: [
  //         {
  //           serviceProviderId: "65bcc9cc165532df06b2c3b4",
  //           approxAmount: "4",
  //           comments: "i can do this job in 2 sittings",
  //         },
  //         {
  //           serviceProviderId: "65c906a3687541bd8567febf",
  //           approxAmount: "5",
  //           comments: "i can do this job in 2 sittings",
  //         },
  //       ],
  //     },
  //   ];
  const [jobs, setJobs] = useState([]);
  const userID = localStorage.getItem("UserID");
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    await apiConnector(
      "get",
      `${endpoints.GETALLAPPLIEDJOBS}/${userID}`,
      "",
      "",
      ""
    ).then((response) => {
      console.log(response);
      setJobs(response.data);
    });
  };
  // const navigate = useNavigate();

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">Applied Jobs</h1>
      <div className=" grid gap-y-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {jobs.map((job, index) => {
          const creationDate = new Date(job.createdOn);
          const differenceInMilliseconds = Date.now() - creationDate;
          const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );
          const isActiveCondition = job.isActive ? "" : "bg-red-200";
          return (
            <JobCard
              job={job}
              index={index}
              differenceInDays={differenceInDays}
              isActiveCondition={isActiveCondition}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AppliedJobs;
