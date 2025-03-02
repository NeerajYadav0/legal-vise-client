import ProfileCard from "@/components/common/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";

function ClientProfilePage() {
  const { getSimilarUsers, getFavLegalist } = useContext(UserContext);
  const type = localStorage.getItem("type");
  const [res, setRes] = useState([]);
  const [favServiceProvider, setFavServiceProvider] = useState([]);
  const searchClients = async (name) => {
    setRes(await getSimilarUsers(name, type));
    console.log(res);
  };

  useEffect(() => {
    getSimilarUsers("");
  });

  useEffect(() => {
    if (type == "client") {
      getFavLegalist()
        .then((data) => {
          console.log(data); // Log the data received from the promise
          setFavServiceProvider(data);
        })
        .catch((err) => {
          console.error("Error:", err); // Handle any errors
        });
    }
  }, [res]);

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-16">
        Search {type == "client" ? "Legalist Profile" : "Client Profile"}
      </h1>
      <div className="  flex flex-col gap-5">
        <div className="relative w-[80%] mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={
              type == "client"
                ? "Search Legalist Names..."
                : "Search Client Names..."
            }
            required
            onChange={(data) => {
              console.log(data.target.value);
              searchClients(data.target.value);
            }}
          />
        </div>
        <div className="w-[80%] mx-auto flex flex-wrap justify-between">
          {res?.map((user, index) => {
            return (
              <ProfileCard
                key={index}
                user={user}
                type={type}
                fav={
                  Array.isArray(favServiceProvider) &&
                  favServiceProvider?.includes(user._id || "")
                }
              />
            );
          })}
          {/* <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard /> */}
        </div>
      </div>
    </div>
  );
}

export default ClientProfilePage;
