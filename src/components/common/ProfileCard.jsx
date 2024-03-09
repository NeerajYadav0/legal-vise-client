import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ProfileCard({ user, type }) {
  const navigate = useNavigate();
  //   const user = {
  //     _id: "65e6d961858c1487549a4f0f",
  //     name: "Neeraj Yadav",
  //     email: "neeraj@email.com",
  //     password: "$2b$10$jGi67MvJbSX9VwbQNHmAIOL2znbt/V7M/6pxvwSyLYtKH3LQ6Hj.u",
  //     state: "haryana",
  //     city: "gurugram",
  //     phoneNumber: 12345678931,
  //     aadharNumber: 1234567893123,
  //     jobs: ["65c8bd09e953bf4357726e82"],
  //     tenthMarksheet: "demo",
  //     twelthMarksheet: "demo",
  //     graduationMarksheet: "demo",
  //     category: ["Legal assistant"],
  //     type: "serviceProvider",
  //     wishlist: [],
  //     date: "2024-03-05T08:35:45.333Z",
  //     createdAt: "2024-03-05T08:35:45.412Z",
  //     updatedAt: "2024-03-05T13:24:20.032Z",
  //     profilePic:
  //       //   "https://as2.ftcdn.net/v2/jpg/02/90/27/39/1000_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
  //       "",
  //     __v: 0,
  //   };
  const creationDate = new Date(user.createdAt);
  const differenceInMilliseconds = Date.now() - creationDate;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  const getInitials = (fullName) => {
    const words = fullName.split(" ");
    const firstNameInitial = words[0][0].toUpperCase();
    const lastNameInitial = words[words.length - 1][0].toUpperCase();
    return firstNameInitial + lastNameInitial;
  };

  return (
    <div>
      <Card className="w-[330px] mb-10">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col gap-4">
              <Avatar className="mx-auto w-[100px] h-[100px] ">
                <AvatarImage src={user.profilePic} />
                <AvatarFallback className="text-5xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="mx-auto">
                <h1>{user.name}</h1>
              </div>
            </div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className=" grid gap-5">
          <div className="grid justify-between w-full items-center gap-4 text-gray-600">
            <div className="flex flex-col space-y-1.5">State :{user.state}</div>
            <div className="flex flex-col space-y-1.5">City :{user.city} </div>
            <div className="flex flex-col space-y-1.5">
              Created :{differenceInDays} Days ago
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              navigate(`/dashboard/user-profile/${user._id}`);
            }}
          >
            View Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProfileCard;
