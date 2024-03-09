import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import JobCard from "@/components/common/JobCard";

function Wishlist() {
  const [jobs, setJobs] = useState([]);
  const userID = localStorage.getItem("UserID");
  const { GETWISHLIST } = endpoints;
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    await apiConnector("get", `${GETWISHLIST}/${userID}`, "", "", "").then(
      (response) => {
        console.log(response);
        setJobs(response.data?.wishlistJobs);
      }
    );
  };
  // const navigate = useNavigate();

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">Wishlist</h1>
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

export default Wishlist;
