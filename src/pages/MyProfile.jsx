import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import photo from "../assets/images/homePageImg1.jpg";
import { DialogClose } from "@radix-ui/react-dialog";
import { UserContext } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function MyProfile() {
  const { name, setName, getDetails, response } = useContext(UserContext);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const type = localStorage.getItem("type");
    console.log(type);
    console.log("in my profile ");
    getDetails(email, type);
    console.log(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">My Profile</h1>

      {/* Personal Information */}
      <Card className="w-[90%] md:p-16 p-5 md:flex md:justify-between ">
        <div className="gap-x-7 md:flex items-center ">
          <div className="h-24 w-24">
            <img
              src={photo}
              alt=""
              className="rounded-full h-[100%] w-[100%] flex items-center"
            />
          </div>
          <div className="font-bold text-lg mt-4 md:mt-0">
            <h1 className="uppercase">Name: {response?.data?.user?.name}</h1>
            <h1>EMAIL: {response?.data?.user?.email}</h1>
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
                <Button
                  variant="outline"
                  className="gap-x-2 flex items-center md:mt-0 mt-4 "
                >
                  Edit Profile <CiEdit className="text-xl" />
                </Button>
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
              id="gender"
              placeholder="Please enter your gender"
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
              type="date"
              id="dateofbirth"
              placeholder="Please enter your name..."
              className="col-span-3"
            />
          </div>

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

          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="city"
              className="text-right w-[100%] flex justify-center"
            >
              City
            </Label>
            <Input
              id="city"
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
              placeholder="Type your message here."
              className="md:w-[300px] w-[80%]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
            <Label
              htmlFor="jobs"
              className="text-right w-[100%] flex justify-center"
            >
              Number of Jobs
            </Label>
            <Input
              id="jobs"
              placeholder="Please enter your name..."
              className="col-span-3"
            />
          </div>
          <div className="flex justify-center gap-4 w-[100%] mt-5 md:w-[50%] md:justify-end">
            <Button className="w-[20%]">Change Password</Button>
            <Button className="w-[20%]">Reset</Button>
            <Button className="w-[20%]">Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MyProfile;
