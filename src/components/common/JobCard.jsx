import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserContext } from "@/context/UserContext";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { State } from "country-state-city";

function JobCard(props) {
  const states = State.getStatesOfCountry("IN");

  const location = useLocation();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { job, index, differenceInDays, isActiveCondition } = props;
  const { handelWishlist, handelConfirmation } = useContext(UserContext);
  const type = localStorage.getItem("type");
  const [confirm, setConfirm] = useState(job.started);
  console.log(job);

  useEffect(() => {
    getInfo();
  }, []);

  const { CHECKINTERESTED } = endpoints;
  const userID = localStorage.getItem("UserID");

  const getInfo = async () => {
    await apiConnector(
      "post",
      CHECKINTERESTED,
      { jobId: job?._id, serviceProviderId: userID },
      "",
      ""
    ).then((res) => {
      setAlreadyApplied(res.data?.userFound);
      setWishlist(res.data?.wishlist);
    });
  };

  const handelConfirm = async () => {
    try {
      await handelConfirmation(job._id, userID, setConfirm).then((res) => {
        alert(`You confirmed ${job.jobName}`);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card key={index} className={`w-[330px] mb-10  ${isActiveCondition}`}>
      <CardHeader>
        <CardTitle>{job.jobName}</CardTitle>
        <CardDescription>{job.category}</CardDescription>
      </CardHeader>
      <CardContent className=" grid gap-5">
        <div className="grid justify-between w-full items-center gap-4 text-gray-600">
          <div className="flex flex-col space-y-1.5">
            State :{" "}
            {states.find((state) => state.isoCode === job?.state)?.name ||
              job.state}
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
        {type === "client" ? (
          <></>
        ) : location.pathname.includes("/selected-jobs-page") ? (
          <Button
            disabled={confirm}
            onClick={() => {
              handelConfirm();
            }}
            variant="outline"
          >
            {!confirm ? "Confirm" : "Confirmed"}
          </Button>
        ) : (
          <Button
            onClick={() => {
              handelWishlist(setWishlist, job._id, userID, wishlist);
            }}
            variant="outline"
          >
            {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
        )}

        <Button
          onClick={() => {
            navigate(`/dashboard/viewJob/${job._id}`);
          }}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}

export default JobCard;
