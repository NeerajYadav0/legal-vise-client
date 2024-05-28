import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import ProfileCard from "@/components/common/ProfileCard";

function Favourite() {
  const [profiles, setProfiles] = useState([]);
  const { getFavLegalist, getDetailsSP } = useContext(UserContext);
  const type = localStorage.getItem("type");
  const [favServiceProvider, setFavServiceProvider] = useState([]);
  useEffect(() => {
    getFavLegalist().then((data) => {
      console.log(data);
      setFavServiceProvider(data);
    });
  }, []);

  useEffect(() => {
    try {
      getDetailsSP(favServiceProvider).then((data) => {
        console.log(data?.users);
        setProfiles(data?.users);
      });
    } catch (error) {
      console.log(error);
    }
  }, [favServiceProvider]);

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">Wishlist</h1>
      <div className=" grid gap-y-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {profiles?.map((profile, index) => {
          return (
            <ProfileCard
              key={index}
              user={profile}
              type={localStorage.getItem("type")}
              fav={
                Array.isArray(favServiceProvider) &&
                favServiceProvider?.includes(profile._id || "")
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Favourite;
