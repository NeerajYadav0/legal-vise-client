import { useContext, useEffect, useState } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import photo from "../../../assets/images/homePageImg1.jpg";
import { DialogClose } from "@radix-ui/react-dialog";
import { UserContext } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formattedDate } from "@/utils/dateFormatter";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";

function MyProfile() {
  // const history = useHistory();

  const { name, setName, getDetails, changePassword, updateProfile } =
    useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState(undefined);
  const [newPassword, setNewPassword] = useState(undefined);
  const [response, setResponse] = useState({});

  // defining use form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      gender: "", // Set default values here
      dateofbirth: "",
      phoneNumber: response?.data?.user?.phoneNumber || "", // Set default value from response
      city: response?.data?.user?.city || "",
      state: response?.data?.user?.state || "",
      aadharNumber: response?.data?.user?.aadharNumber || "",
      createdAt: formattedDate(response?.data?.user?.createdAt) || "",
      jobs: "", // You can set default values as needed
    },
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const type = localStorage.getItem("type");
    console.log(type);
    console.log("in my profile ");
    getDetails(email, type).then((res) => {
      setResponse(res);
    });
    console.log(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    reset({
      gender: "", // Set default values here
      dateofbirth: "",
      phoneNumber: response?.data?.user?.phoneNumber || "", // Set default value from response
      city: response?.data?.user?.city || "",
      state: response?.data?.user?.state || "",
      aadharNumber: response?.data?.user?.aadharNumber || "",
      createdAt: formattedDate(response?.data?.user?.createdAt) || "",
      jobs: "", // You can set default values as needed
    });
  }, [response]);
  const handelChangePassword = async () => {
    // changePassword(currentPassword, newPassword);
    console.log(currentPassword);
    console.log(newPassword);
    if (currentPassword == undefined || newPassword == undefined) {
      toast.error("All Fields are required");
    } else {
      await changePassword(currentPassword, newPassword).then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success("Password Changed");
        } else {
          toast.error("Some error occured");
        }
      });
    }
  };
  const handelProfileUpdate = async () => {
    await updateProfile(getValues()).then((res) => {
      if (res.data.success) {
        reset({
          gender: "", // Set default values here
          dateofbirth: "",
          phoneNumber: res?.data?.updatedProfile?.phoneNumber || "", // Set default value from response
          city: res?.data?.updatedProfile?.city || "",
          state: res?.data?.updatedProfile?.state || "",
          aadharNumber: res?.data?.updatedProfile?.aadharNumber || "",
          createdAt: formattedDate(res?.data?.updatedProfile?.createdAt) || "",
          jobs: "", // You can set default values as needed
        });
        toast.success("Updated Profile");
      } else {
        toast.error("Some error occured");
      }
    });

    console.log(getValues());
  };
  const handelReset = async () => {
    reset();
    toast.success("Data reseated");
  };
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
        <form onSubmit={handleSubmit(handelProfileUpdate)}>
          <div className="w-[100%] md:flex md:justify-between md:flex-wrap gap-y-5">
            <div className="grid grid-cols-4 items-center gap-4 w-[100%] md:w-[50%]">
              <Label
                htmlFor="gender"
                className="text-right w-[100%] flex justify-center"
              >
                Gender
              </Label>
              <Input
                {...register("gender")}
                id="gender"
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
                type="date"
                {...register("dateofbirth")}
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
                {...register("phoneNumber")}
                // defaultValue={response?.data?.user?.phoneNumber}
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
                // defaultValue={response?.data?.user?.city}
                {...register("city")}
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
                // defaultValue={response?.data?.user?.state}
                {...register("state")}
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
                // defaultValue={response?.data?.user?.aadharNumber}
                {...register("aadharNumber")}
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
                // defaultValue={formattedDate(response?.data?.user?.createdAt)}
                {...register("createdAt")}
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
                {...register("about")}
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
                readOnly
                {...register("jobs")}
              />
            </div>
            <div className="flex justify-center gap-4 w-[100%] mt-5 md:w-[50%] md:justify-end flex-wrap">
              {/* <Button className="w-[20%]" onClick={()=>{ handelChangePassword()}}>Change Password</Button> */}
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Change Password</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currpass" className="text-right">
                          Current Password
                        </Label>
                        <Input
                          id="currpass"
                          value={currentPassword}
                          onChange={(val) => {
                            // console.log(val);
                            setCurrentPassword(val.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="newpass" className="text-right">
                          New Password
                        </Label>
                        <Input
                          id="newpass"
                          value={newPassword}
                          onChange={(val) => {
                            setNewPassword(val.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            handelChangePassword();
                          }}
                          type="submit"
                        >
                          Change Password
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
              <Button
                className="w-[20%]"
                type="button"
                onClick={() => {
                  handelReset();
                }}
              >
                Reset
              </Button>
              <Button className="w-[20%]" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default MyProfile;
