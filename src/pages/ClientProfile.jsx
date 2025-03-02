import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import photo from "../assets/images/homePageImg1.jpg";
import { DialogClose } from "@radix-ui/react-dialog";
import { UserContext } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HoverRating from "@/components/common/HoverRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReportIcon from "@mui/icons-material/Report";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import GradeIcon from "@mui/icons-material/Grade";

function ClientProfile() {
  const [reason, setReason] = useState("");
  const { id } = useParams("id");
  const { handelRazorpay, report } = React.useContext(UserContext);
  const [trigger, setTrigger] = useState(false);
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [readyForReview, setReadyForReview] = useState([]);
  const afterUnlock = () => {
    setTrigger(!trigger);
  };
  //   const [user, setUser] = useState({});
  //   const { GETCLIENTDETAILS } = endpoints;
  //   useEffect(() => {
  //     console.log(id);
  //     getUserInfo();
  //   }, []);

  //   const getUserInfo = async () => {
  //     const response = await apiConnector(
  //       "get",
  //       `${GETCLIENTDETAILS}/${id}`,
  //       {},
  //       "",
  //       ""
  //     ).then((res) => {
  //       setUser(res.data?.user);
  //       console.log(res);
  //     });
  //     console.log(response);
  //   };
  // my profile code paste

  const {
    name,
    setName,
    response,
    getDetailsById,
    getUnlockedUsers,
    addRating,
    ReadyForRatingUsers,
    setResponse,
  } = useContext(UserContext);
  const type = localStorage.getItem("type");
  const [unlocked, setUnlocked] = useState([]);
  useEffect(() => {
    setResponse({});
    if (type == "client") {
      ReadyForRatingUsers().then(async (res) => {
        console.log(await res);
        setReadyForReview(await res);
      });
      getUnlockedUsers().then((res) => {
        setUnlocked(res);
      });
      console.log("in Legalist search profile ");
      getDetailsById(id, "serviceProvider");
    } else {
      console.log("in Client search  profile ");
      getDetailsById(id, "client");
      console.log(response);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(
      response?.data?.user?.rating?.find(
        (rating) => rating.customerId === localStorage.getItem("UserID")
      )?.rating || 0
    );
  }, [trigger]);
  useEffect(() => {
    console.log(readyForReview);
    console.log(showRating);
  });
  useEffect(() => {
    console.log(readyForReview);
    if (readyForReview?.includes(response.data?.user?._id)) {
      setShowRating(true);
      console.log(readyForReview, response.data?.user?._id);
    }
    setRating(
      response?.data?.user?.rating?.find(
        (rating) => rating.customerId === localStorage.getItem("UserID")
      )?.rating || 0
    );
    setComments(
      response?.data?.user?.rating?.find(
        (rating) => rating.customerId === localStorage.getItem("UserID")
      )?.comment || ""
    );
  }, [readyForReview, response]);

  const handelSubmit = async () => {
    await addRating(response?.data?.user?._id, comments, rating);
  };
  const getInitials = () => {
    const words = response?.data?.user?.name?.split(" ") || " ";
    const firstNameInitial = words[0][0]?.toUpperCase();
    const lastNameInitial = words[words.length - 1][0]?.toUpperCase();
    return firstNameInitial + lastNameInitial;
  };
  const getRating = () => {
    const ratings = response?.data?.user?.rating || []; // Ensure ratings is an array

    // Calculate the sum of all ratings
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);

    // Calculate the average
    const average = sum / ratings.length;

    // Round the average to 1 decimal point
    const averageRounded = Math.round(average * 10) / 10;

    return averageRounded || "no rating";
  };
  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">
        {" "}
        {type == "client" ? "Legalist Profile" : "Client Profile"}
      </h1>

      {/* Personal Information */}
      <Card className="w-[90%] md:p-16 p-5 md:flex md:justify-between ">
        <div className="gap-x-7 md:flex items-center ">
          <div className="h-24 w-24">
            <Avatar className="mx-auto w-[100px] h-[100px] ">
              <AvatarImage src={response?.data?.user?.profilePicture} />
              <AvatarFallback className="text-5xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="font-bold text-lg mt-4 md:mt-0">
            <h1 className="uppercase">Name: {response?.data?.user?.name}</h1>
            <h1>
              EMAIL:{" "}
              {unlocked?.includes(response?.data?.user?._id)
                ? response?.data?.user?.email
                : "XXXXXXX@gmail.com"}
            </h1>
            <h1 className="uppercase">
              Account Type: {response?.data?.user?.type}
            </h1>
          </div>
          <div></div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex h-full items-center sm:flex sm: justify-end">
                {/* <Button
                  variant="outline"
                  className="gap-x-2 flex items-center md:mt-0 mt-4 "
                >
                  Edit Profile <CiEdit className="text-xl" />
                </Button> */}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="name"
                    className="text-right w-[100%] flex justify-center"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Please enter your name..."
                    defaultValue={name}
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <DialogClose asChild>
                <Button
                  className="w-[30%] mx-auto"
                  // onClick={() => setUserName(name)}
                >
                  Save changes
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="mt-16 text-2xl mb-4">
        <h1>Profile Information</h1>
      </div>
      {/* Profile Information */}
      <Card className="w-[90%] md:px-16 sm:px-3 py-4 md:flex md:justify-between mb-10">
        <div className="w-[100%] md:flex md:justify-between md:flex-wrap gap-y-5">
          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="gender"
              className="text-right w-[100%] flex justify-center"
            >
              Gender
            </Label>
            <Input
              readOnly
              id="gender"
              value={response?.data?.user?.gender}
              placeholder="Please enter your name..."
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="dateofbirth"
              className="text-right w-[100%] flex justify-center"
            >
              Date Of Birth
            </Label>
            <Input
              readOnly
              type="date"
              id="dateofbirth"
              value={response?.data?.user?.dob}
              placeholder="Please enter your name..."
              className="col-span-3"
            />
          </div>

          {unlocked?.includes(response?.data?.user?._id) ? (
            <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
              <Label
                htmlFor="number"
                className="text-right w-[100%] flex justify-center"
              >
                Contact Number
              </Label>
              <Input
                id="number"
                placeholder="Please enter your number..."
                className="col-span-3 font-semibold"
                readOnly
                defaultValue={response?.data?.user?.phoneNumber}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="city"
              className="text-right w-[100%] flex justify-center"
            >
              City
            </Label>
            <Input
              id="city"
              readOnly
              placeholder="Please enter your city..."
              className="col-span-3"
              defaultValue={response?.data?.user?.city}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="state"
              className="text-right w-[100%] flex justify-center"
            >
              State
            </Label>
            <Input
              id="state"
              readOnly
              placeholder="Please enter your state..."
              className="col-span-3"
              defaultValue={response?.data?.user?.state}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="aadhar"
              className="text-right w-[100%] flex justify-center"
            >
              Aadhar Number
            </Label>
            <Input
              id="aadhar"
              className="col-span-3 flex justify-center font-semibold"
              readOnly
              defaultValue={response?.data?.user?.aadharNumber}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="created"
              className="text-right w-[100%] flex justify-center"
            >
              Created At
            </Label>
            <Input
              id="created"
              placeholder="Please enter your name..."
              className="col-span-3"
              readOnly
              defaultValue={response?.data?.user?.createdAt}
            />
          </div>

          <div className="flex items-center gap-4 md:w-[50%] w-[100%]         gap-x-11">
            <Label
              htmlFor="about"
              className="text-right w-[20%] flex justify-center"
            >
              About
            </Label>
            <Textarea
              readOnly
              value={response?.data?.user?.about}
              placeholder="Type your message here."
              className="md:w-[300px] w-[80%]"
            />
          </div>
          {type == "client" ? (
            <></>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
              <Label
                htmlFor="jobs"
                className="text-right w-[100%] flex justify-center"
              >
                Number of Jobs
              </Label>
              <Input
                id="jobs"
                readOnly
                placeholder="Please enter your name..."
                className="col-span-3"
              />
            </div>
          )}
          {response?.data?.user?.rating ? (
            <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
              <Label
                htmlFor="jobs"
                className="text-right w-[100%] flex justify-center"
              >
                Rating
              </Label>
              <span>
                {" "}
                {getRating()} <GradeIcon />
              </span>
            </div>
          ) : (
            <></>
          )}
          {type == "client" && showRating ? (
            <div className="w-[100%] mx-auto border-[2px]">
              <h1 className="flex justify-center">Rating</h1>
              <div className="w-full">
                <div className="w-full flex justify-evenly">
                  <Input
                    className="w-[40%] mb-4 mt-4"
                    placeholder="Comments"
                    value={comments}
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
                  />
                  {console.log(response?.data?.user?.rating)}
                  {console.log(localStorage.getItem("UserId"))}
                  <HoverRating rating={rating} setRating={setRating} />{" "}
                </div>
                <div className="w-full flex justify-center mb-2">
                  <Button
                    onClick={() => {
                      handelSubmit();
                    }}
                  >
                    Submit Rating
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {type == "client" ? (
            <div className="w-[100%]">
              <div className="border-gray-200 border-[2px] mt-5">
                {response?.data?.user?.pictures != 0 ? (
                  <Carousel>
                    <CarouselContent>
                      {response?.data?.user?.pictures?.map((imgSrc, index) => {
                        return (
                          <CarouselItem key={index}>
                            <div className="relative group w-full h-full bg-black cursor-pointer ">
                              <img
                                width={300}
                                height={300}
                                src={imgSrc}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform transform group-hover:scale-105 duration-300 group-hover:opacity-50"
                                style={{
                                  maxHeight: "300px",
                                  minHeight: "150px",
                                }}
                              />
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
                    <CarouselNext className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
                  </Carousel>
                ) : (
                  <div className="w-full flex justify-center text-gray-500">
                    No Images Uploaded{" "}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="flex justify-center gap-4 w-[100%] mt-5  md:justify-end">
            {/* experiment  */}

            <Drawer>
              <DrawerTrigger asChild>
                <Button className="w-[15%]">
                  <ReportIcon className="mr-2" />
                  Report
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex mx-auto flex-col">
                  <DrawerTitle className="mx-auto">
                    Report {response?.data?.user?.name}{" "}
                  </DrawerTitle>
                  <DrawerDescription>
                    Why Do you want to report {response?.data?.user?.name} ?
                  </DrawerDescription>
                </DrawerHeader>
                <div className="w-[50%] mx-auto">
                  <Textarea
                    placeholder="Type your reason here"
                    className="min-h-[100px]"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </div>

                <DrawerClose asChild>
                  <div className="w-[50%] flex mx-auto flex-col">
                    <Button
                      className="mt-5"
                      onClick={() => {
                        report(response?.data?.user?._id, reason);
                        setReason("");
                      }}
                    >
                      Submit
                    </Button>
                    <Button variant="outline" className="my-5">
                      Close
                    </Button>
                  </div>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
            {/* till here  */}
            {type == "client" ? (
              <>
                <Button className="w-[15%]">Add to Favourite</Button>

                {unlocked?.includes(response?.data?.user?._id) ? (
                  <></>
                ) : (
                  <Button
                    className="w-[15%]"
                    onClick={() => {
                      handelRazorpay(
                        id,
                        response?.data?.user?.name,
                        afterUnlock
                      );
                    }}
                  >
                    Unlock
                  </Button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ClientProfile;
