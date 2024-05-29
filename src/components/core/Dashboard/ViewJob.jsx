import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { endpoints } from "@/services/apis";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { apiConnector } from "@/services/apiConnector";
import { UserContext } from "@/context/UserContext";

import Table from "@/components/common/CollapsibleTable";
import EnhancedTable from "@/components/common/EnhancedTable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { State } from "country-state-city";

function ViewJob() {
  const states = State.getStatesOfCountry("IN");
  const { getInterestedDetails, getUnlockedUsers, changeJobStatus } =
    useContext(UserContext);
  const [rows, setRows] = useState([]);
  const [unlocked, setUnlocked] = useState([]);
  const [job, setJob] = useState({});
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [status, setStatus] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState();
  const [comments, setComments] = useState("");
  const type = localStorage.getItem("type");
  const userID = localStorage.getItem("UserID");
  const { id } = useParams("id");
  const jobId = id;
  const { APPLYJOB, GETONEJOB, CHECKINTERESTED } = endpoints;
  const { handelWishlist } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUnlocked();
    getJob();
  }, [trigger]);

  useEffect(() => {
    if (job && unlocked.length) {
      getDetails();
    }
  }, [job, unlocked]);

  const getDetails = async () => {
    await getInterestedDetails(job?.interested, unlocked).then((res) => {
      setRows(res.data);
      setLoading(false); // Set loading to false once data is loaded
    });
  };

  const getUnlocked = async () => {
    await getUnlockedUsers().then((res) => {
      setUnlocked(res);
    });
  };

  const getJob = async () => {
    setLoading(true); // Set loading to true when fetching data
    await apiConnector("get", `${GETONEJOB}/${jobId}`, {}, "", "").then(
      (res) => {
        setJob(res.data.job);
        setStatus(res?.data?.job?.isActive);
      }
    );
    await apiConnector(
      "post",
      CHECKINTERESTED,
      { jobId, serviceProviderId: userID },
      "",
      ""
    ).then((res) => {
      setAlreadyApplied(res.data?.userFound);
      setWishlist(res.data?.wishlist);
    });
  };

  const applyJob = async () => {
    try {
      if (selectedPrice == undefined || comments == "") {
        toast.error("All Fields are required");
      } else {
        await apiConnector(
          "post",
          APPLYJOB,
          {
            jobId: jobId,
            serviceProviderId: userID,
            approxAmount: selectedPrice,
            comments: comments,
          },
          "",
          ""
        );
        setAlreadyApplied(true);
        toast.success("Applied Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred");
    }
  };

  const changeStatus = () => {
    setStatus(!status);
    changeJobStatus(job?._id).then(() => {
      toast.success("Job status changed");
    });
  };

  const creationDate = new Date(job.createdOn);
  const differenceInMilliseconds = Date.now() - creationDate;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

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
              {job?.category?.map((subCategory, index) => {
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
                State :{" "}
                {states.find((state) => state.isoCode === job?.state)?.name ||
                  job.state}
              </div>
              <div className="flex flex-col space-y-1.5">City : {job.city}</div>
              <div className="flex flex-col space-y-1.5">
                Created : {differenceInDays} Days ago
              </div>
              <div className="flex flex-col space-y-1.5">
                Application Count : {job?.interested?.length}
              </div>
              <div className="flex flex-col space-y-1.5">
                Job Location : {job.jobLocation}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {type === "client" ? (
              <div className="w-full">
                <div className="flex justify-between">
                  <Button
                    className="mb-4"
                    variant="outline"
                    onClick={() => {
                      setShowTable(!showTable);
                    }}
                  >
                    {showTable ? "Hide" : "View"} Applications
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      changeStatus();
                    }}
                    className={`${status ? "" : "bg-red-300"}`}
                  >
                    {status ? "Set Inactive" : "Set Active"}
                  </Button>
                </div>

                {showTable ? (
                  <div>
                    <EnhancedTable
                      interested={job?.interested}
                      rows={rows}
                      getUnlocked={getUnlocked}
                      jobId={jobId}
                      selectedUserId={job?.selected}
                      setTrigger={setTrigger}
                      trigger={trigger}
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handelWishlist(setWishlist, jobId, userID, wishlist);
                  }}
                >
                  {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate(`/dashboard/user-profile/${job.customerId}`);
                  }}
                >
                  View Customer Profile
                </Button>

                <Drawer>
                  <DrawerTrigger disabled={alreadyApplied || !job?.isActive}>
                    <Button variant="outline">
                      {alreadyApplied
                        ? "Already Applied"
                        : job?.isActive
                        ? "Apply"
                        : "Job Inactive"}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Apply for job?</DrawerTitle>
                      <DrawerDescription>
                        This action cannot be undone.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col md:flex-row justify-evenly w-full min-h-[100px] ">
                      <div className="flex flex-col  items-center">
                        <h1 className="pb-5 md:p-0">Approx Amount</h1>
                        <div className="pb-5 md:p-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="outline">
                                {selectedPrice
                                  ? selectedPrice
                                  : "Select Approx Amount"}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Select Amount
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => setSelectedPrice(500)}
                                >
                                  ₹ 500
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setSelectedPrice(1000)}
                                >
                                  ₹ 1000
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setSelectedPrice(1500)}
                                >
                                  ₹ 1500
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setSelectedPrice(2000)}
                                >
                                  ₹ 2000
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="md:flex-row flex flex-col items-center">
                        <h1 className="pb-5 md:p-0">Add Comments</h1>
                        <Textarea
                          className=" md:mx-5"
                          placeholder="Type your message here."
                          onChange={(e) => setComments(e.target.value)}
                        />
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedPrice();
                            setComments("");
                          }}
                        >
                          Cancel
                        </Button>
                      </DrawerClose>
                      <Button
                        type="submit"
                        variant="outline"
                        onClick={applyJob}
                      >
                        Apply
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </CardFooter>
        </Card>

        <Drawer>
          <DrawerTrigger asChild>
            <div className=" relative w-[30%] h-[300px] flex hover:scale-110 duration-500">
              <div className="w-full h-full view-job-image rounded-lg flex justify-center text-black  "></div>
              <div className="absolute font-bold top-[40%] left-[15%] text-5xl ">
                View Images
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className=" mx-auto w-full max-w-sm">
              {/* <DrawerHeader>
                <DrawerTitle>Image</DrawerTitle>
                <DrawerDescription>Job related image.</DrawerDescription>
              </DrawerHeader> */}
              <div className="flex flex-col md:flex-row justify-evenly w-full min-h-[100px] ">
                <div className="flex flex-col  items-center">
                  <Carousel
                    plugins={[
                      Autoplay({
                        delay: 3000,
                      }),
                    ]}
                    className="lg:w-auto"
                    opts={{
                      align: "start",
                      loop: true,

                      // interval={5000};
                    }}
                  >
                    <CarouselContent>
                      {job?.pictures?.map((imgSrc, index) => {
                        return (
                          <CarouselItem key={index}>
                            <img
                              width={300}
                              height={300}
                              src={imgSrc}
                              alt="Image 2"
                              className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-300"
                              style={{
                                maxHeight: "300px",
                                minHeight: "150px",
                                width: "auto",
                                height: "auto",
                              }}
                            />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
                    <CarouselNext className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
                  </Carousel>
                  <DrawerClose asChild>
                    <Button variant="outline" className="my-5">
                      Close
                    </Button>
                  </DrawerClose>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default ViewJob;
