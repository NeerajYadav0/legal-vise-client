import { useContext, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);

  const welcomeImage =
    "https://t3.ftcdn.net/jpg/05/75/22/58/360_F_575225818_PQ2ZPHFw51yCcmieutB5bT843nPAPzo3.jpg";

  //   const handleLogin = () => {
  //     console.log("Logging in...", { username, password });
  //   };

  const loginHandler = (username, password) => {
    if (username.length === 0 || password.length === 0) {
      toast.error("All Fieds are required");
    } else {
      login(username, password);
    }
  };

  return (
    <div className="p-0">
      <div className="flex relative items-center justify-center h-screen">
        <div className="h-[75%] hidden md:flex">
          <img src={welcomeImage} alt="" />
        </div>
        <Card className="w-screen lg:w-[35%] p-0 h-screen md:h-[75%] rounded-none flex justify-center flex-col gap-y-3">
          <CardHeader className="w-fit">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Login to manage your legal matters efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-[100%] items-center gap-4 ">
                <div className="flex flex-col space-y-1.5 ">
                  <Tabs
                    defaultValue="account"
                    className=" w-[100%] text-center"
                  >
                    <TabsList>
                      <TabsTrigger value="account">Lawyer</TabsTrigger>
                      <TabsTrigger value="password">Client</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Label htmlFor="name">
                    E-mail <sup>*</sup>
                  </Label>
                  <Input
                    type="email"
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
              <CardFooter className="flex justify-center mt-10">
                <div className="flex justify-center">
                  <Button
                    className="w-32"
                    onClick={() => loginHandler(username, password)}
                  >
                    Login
                  </Button>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
