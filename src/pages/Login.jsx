import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const welcomeImage =
    "https://t3.ftcdn.net/jpg/05/75/22/58/360_F_575225818_PQ2ZPHFw51yCcmieutB5bT843nPAPzo3.jpg";

  const handleLogin = () => {
    console.log("Logging in...", { username, password });
  };

  return (
    <div className="">
      <div className="flex relative items-center justify-center h-[90vh]">
        <div className="flex h-[80%]">
          <img src={welcomeImage} alt="" />
        </div>

        {/* <div className="flex-1 flex items-center justify-center h-[80%] ">
          <div className="backdrop-blur-md p-7 h-[100%] w-full ">
            <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
            <div className="flex justify-center">
              
            </div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="text-white block text-sm font-medium mb-2"
                >
                  Username:
                </label>
                
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="text-white block text-sm font-medium mb-2"
                >
                  Password:
                </label>
               
              </div>
              <div className="flex justify-center">
                <Button type="button" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div> */}

        <Card className="w-[35%] h-[80%] rounded-none flex justify-center flex-col items-center gap-y-3">
          <CardHeader className="w-[100%]">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Login to manage your legal matters efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Tabs
                    defaultValue="account"
                    className="w-[400px] text-center"
                  >
                    <TabsList>
                      <TabsTrigger value="account">Lawyer</TabsTrigger>
                      <TabsTrigger value="password">Client</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Label htmlFor="name">
                    Name <sup>*</sup>
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">
                    Password <sup>*</sup>
                  </Label>
                  <div className="flex items-center gap-x-5">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="z-[10] cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex justify-center">
              <Button className="w-32">Login</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
