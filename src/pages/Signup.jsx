import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import React from "react";
import { GoLaw } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";
import { apiConnector } from "@/services/apiConnector";
import OtpInput from "react-otp-input";
import { toast } from "sonner";
import { ImCross } from "react-icons/im";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import reactToast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [userOTP, setuserOTP] = useState("");
  const [type, setType] = useState("Client");
  const {
    register: cregister,
    handleSubmit: chandleSubmit,
    getValues: cgetValues,
    formState: { cerrors },
  } = useForm();
  const {
    register: vregister,
    handleSubmit: vhandleSubmit,
    getValues: vgetValues,
    formState: { verrors },
  } = useForm();
  const [isOTP, setIsOTP] = useState(false);

  const categoryList = [
    "Lawyer",
    "Notaries",
    "Consultant",
    "Mediator",
    "Legal Researchers",
    "Legal Document Preparer",
    "Legal Translator",
  ];

  const [category, setCategory] = useState([]);

  const registerClient = async () => {
    try {
      console.log(type);
      if (type == "Client") {
        await apiConnector(
          "post",
          "http://localhost:8000/api/customer/register",
          {
            ...cgetValues(),
            otp: userOTP,
            phoneNumber: cgetValues().number,
            aadharNumber: cgetValues().aadhar,
          },
          "",
          ""
        ).then(() => {
          toast("Success", {
            description: "User registered successfully",
            action: {
              label: <ImCross />,
              onClick: () => console.log("Undo"),
            },
          });
          navigate("/login");
        });
      } else {
        await apiConnector(
          "post",
          "http://localhost:8000/api/serviceProvider/register",
          {
            ...vgetValues(),
            category,
            otp: userOTP,
            phoneNumber: vgetValues().number,
            aadharNumber: vgetValues().aadhar,
          },
          "",
          ""
        ).then(() => {
          toast("Success", {
            description: "User registered successfully",
            action: {
              label: <ImCross />,
              onClick: () => console.log("Undo"),
            },
          });
          navigate("/login");
        });
      }
    } catch (error) {
      toast("Error", {
        description: "Some error occurred",
        action: {
          label: <ImCross />,
          onClick: () => console.log("Undo"),
        },
      });
      setIsOTP(false);
      setuserOTP("");
    }
  };

  const onCSubmit = (e) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
    if (cgetValues().password == cgetValues().cpassword) {
      setIsOTP(true);
      getOTP(e.number);
    } else {
      toast("Password Mismatch", {
        description: "Confirm password and password should be same",
        action: {
          label: <ImCross />,
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  const getOTP = async (number) => {
    await apiConnector(
      "post",
      "http://localhost:8000/api/otp/send-otp",
      { mobileNumber: number },
      "",
      ""
    );
  };

  const onVSubmit = (e) => {
    console.log(vgetValues());
    if (vgetValues().password == vgetValues().cpassword) {
      setIsOTP(true);
      getOTP(e.number);
    } else {
      toast("Password Mismatch", {
        description: "Confirm password and password should be same",
        action: {
          label: <ImCross />,
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  const handelCategory = (value) => {
    if (category.includes(value)) {
      // If the value is already present, remove it
      setCategory(category.filter((item) => item !== value));
    } else {
      // If the value is not present, add it
      setCategory([...category, value]);
    }
    console.log("====================================");
    console.log(category);
    console.log("====================================");
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      reactToast.info("Password must be at least 8 characters long");
      return "Password must be at least 8 characters long";
    }
    // Add more validation rules as needed
    return true;
  };

  const cpasswordError = cerrors?.password ? cerrors?.password.message : null;
  const vpasswordError = verrors?.password ? verrors?.password.message : null;

  return (
    <div className=" h-auto md:h-[90%]">
      <div className="text-white  flex justify-center signup-bg-img h-[100%] max-w-[100%] md:py-10">
        <div className="w-11/12 flex justify-center text-center my-auto h-full">
          <div className=" w-full md:w-[80%]  h-[100%] md:h-[620px] flex  my-auto  signupOpacity   rounded-lg shadow-black shadow-lg">
            <div className=" w-[50%] hidden md:flex h-full ">
              <div className="flex-col my-auto mx-auto ">
                <div className="flex items-center gap-3 w-full  justify-center">
                  <GoLaw className="text-7xl font-semibold" />
                  <div className="text-5xl font-serif font-semibold">
                    {" "}
                    Legal vise
                  </div>
                </div>
                <div className="text-3xl text-white  w-full ">
                  Your Legal Lifeline in the Digital Age
                </div>
              </div>
            </div>
            <div className="lg:w-[50%] md:w-full w-full h-full">
              <div className="p-4 h-full ">
                {isOTP ? (
                  <div className=" h-[90vh]  overflow-hidden lg:h-full flex flex-col lg:justify-evenly items-center ">
                    <div className=" text-lg lg:text-4xl m-14 lg:m-0 font-semiboldbold font-mono">
                      Enter your OTP
                    </div>
                    <OtpInput
                      placeholder="------"
                      value={userOTP}
                      className="justify-center text-lg rounded-lg bg-slate-300 items-center"
                      containerStyle="flex w-full justify-center  text-3xl lg:text-6xl lg:m-0 m-14"
                      inputStyle="text-black rounded-lg bg-slate-300 h-[70%]  "
                      shouldAutoFocus="true"
                      onChange={setuserOTP}
                      numInputs={6}
                      renderSeparator={
                        <span className="flex items-center">-</span>
                      }
                      renderInput={(props) => <input {...props} />}
                    />
                    <div className="flex w-full justify-evenly lg:m-0 m-14 ">
                      <Button
                        className="w-[25%] h-[100%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
                        onClick={() => {}}
                      >
                        Resent OTP
                      </Button>
                      <Button
                        className="w-[25%] h-[100%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
                        onClick={registerClient}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/*code starts from here */}
                    <Tabs defaultValue="Client" className="w-auto">
                      <TabsList>
                        <TabsTrigger
                          onClick={() => {
                            setType("Client");
                          }}
                          value="Client"
                        >
                          Client
                        </TabsTrigger>
                        <TabsTrigger
                          onClick={() => {
                            setType("Vendor");
                          }}
                          value="Vendor"
                        >
                          Vendor
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="Client">
                        <form onSubmit={chandleSubmit(onCSubmit)}>
                          <div className="mb-6">
                            <label className=" mb-2 text-md font-medium text-white dark:text-green-500 justify-start flex ">
                              Your name{" "}
                              <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                *
                              </sup>
                            </label>
                            <Input
                              required
                              type="text"
                              name="name"
                              className="text-black"
                              {...cregister("name")}
                              // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                              placeholder="Enter you name"
                            />
                            {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                          </div>
                          <div className="mb-6">
                            <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                              Email Id
                              <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                *
                              </sup>
                            </label>
                            <Input
                              name="email"
                              required
                              {...cregister("email")}
                              type="email"
                              className="text-black"
                              // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                              placeholder="abc@gmail.com"
                            />
                            {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                          </div>
                          <div className="md:flex  gap-2">
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                                Password
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                type="text"
                                required
                                className="text-black"
                                name="password"
                                {...cregister("password", {
                                  validate: validatePassword,
                                })}
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter your password"
                              />
                              {cpasswordError && (
                                <span className="text-red-500">
                                  {cpasswordError}
                                </span>
                              )}

                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white">
                                Confirm password
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="cpassword"
                                required
                                {...cregister("cpassword")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter your password again"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                          </div>
                          <div className=" md:flex gap-2">
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                                Pincode
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="pincode"
                                required
                                {...cregister("pincode")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter you Pincode"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white">
                                Phone Number
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="number"
                                required
                                {...cregister("number")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter you Phone Number"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                          </div>
                          <div className="mb-6">
                            <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                              Aadhar Number
                              <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                *
                              </sup>
                            </label>
                            <Input
                              type="text"
                              required
                              className="text-black"
                              name="aadhar"
                              {...cregister("aadhar")}
                              // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                              placeholder="Enter your Aadhar Number"
                            />
                            {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                          </div>
                          <Button
                            type="submit"
                            className="w-[25%] h-[90%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
                            onClick={() => {}}
                          >
                            Send OTP
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="Vendor">
                        <form onSubmit={vhandleSubmit(onVSubmit)}>
                          <div className="mb-6">
                            <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                              Your name
                              <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                *
                              </sup>
                            </label>
                            <Input
                              name="name"
                              required
                              {...vregister("name")}
                              type="text"
                              className="text-black"
                              // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                              placeholder="Enter you name"
                            />
                            {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                          </div>
                          <div className="mb-6">
                            <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                              Email Id
                              <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                *
                              </sup>
                            </label>
                            <Input
                              name="email"
                              required
                              {...vregister("email")}
                              type="text"
                              className="text-black"
                              // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                              placeholder="abc@gmail.com"
                            />
                            {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                          </div>
                          <div className="md:flex  gap-2">
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                                Password
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="password"
                                required
                                {...vregister("password", {
                                  validate: validatePassword,
                                })}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter your password"
                              />

                              {vpasswordError && (
                                <span className="text-red-500">
                                  {vpasswordError}
                                </span>
                              )}

                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white">
                                Confirm password
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="cpassword"
                                required
                                {...vregister("cpassword")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter your password again"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                          </div>
                          <div className=" md:flex gap-2">
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white dark:text-green-500">
                                Pincode
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="pincode"
                                required
                                {...vregister("pincode")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter you Pincode"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white">
                                Phone Number
                                <sup className="bold mt-1 ml-1 text-lg text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="number"
                                required
                                {...vregister("number")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter you Phone Number"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                          </div>
                          <div className=" md:flex gap-2">
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white">
                                Aadhar Number
                                <sup className="bold text-lg mt-1 ml-1 text-red-800">
                                  *
                                </sup>
                              </label>
                              <Input
                                name="aadhar"
                                required
                                {...vregister("aadhar")}
                                type="text"
                                className="text-black"
                                // className="bg-gray-400 border border-white text-white placeholder-white text-sm rounded-lg block w-full p:1  md:p-1.5"
                                placeholder="Enter your aadhaar number"
                              />
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                            <div className="mb-6 w-full">
                              <label className="justify-start flex mb-2 text-md font-medium text-white">
                                Category
                                <sup className="font-bold text-lg mt-1 ml-1 text-red-800">
                                  *
                                </sup>
                              </label>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="text-black w-full"
                                  >
                                    Category
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-full">
                                  {categoryList.map((value, index) => {
                                    return (
                                      <>
                                        <DropdownMenuItem
                                          key={index}
                                          onClick={() => {
                                            handelCategory(value);
                                          }}
                                        >
                                          {value}{" "}
                                          {category.includes(value) ? (
                                            <TiTick />
                                          ) : (
                                            ""
                                          )}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                      </>
                                    );
                                  })}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                      <span className="font-medium">Well done!</span> Some
                      success message.
                    </p> */}
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-[25%] h-[90%] text-center bg-white text-black hover:scale-95 duration-200 hover:text-white"
                            onClick={() => {}}
                          >
                            Send OTP
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>

                    {/*code ends here */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
