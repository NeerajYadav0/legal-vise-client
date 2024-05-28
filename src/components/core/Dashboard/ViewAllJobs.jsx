import { useState, useEffect } from "react";
import { apiConnector } from "@/services/apiConnector";
import { endpoints } from "@/services/apis";
import JobCard from "@/components/common/JobCard";
import { State, City } from "country-state-city";
import { MdOutlineHome } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TiTick } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import CategoryIcon from "@mui/icons-material/Category";

function ViewAllJobs() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [category, setCategory] = useState([]);

  const states = State.getStatesOfCountry("IN");
  const cities = City.getCitiesOfState("IN", state);
  const categoryList = [
    "Lawyer",
    "Notaries",
    "Consultant",
    "Mediator",
    "Legal Researchers",
    "Legal Document Preparer",
    "Legal Translator",
  ];

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [state, city, category, jobs]);

  const getJobs = async () => {
    const type = localStorage.getItem("type");
    const userId = localStorage.getItem("UserID");
    await apiConnector(
      "get",
      `${
        type === "client"
          ? `${endpoints.CUSTOMER_JOBS + userId}`
          : endpoints.GETALLJOBS
      }`
    ).then((response) => {
      setJobs(response.data);
    });
  };

  const filterJobs = () => {
    let filtered = jobs;
    if (state) {
      filtered = filtered.filter((job) => job.state === state);
    }
    if (city) {
      filtered = filtered.filter((job) => job.city === city);
    }
    if (category.length > 0) {
      filtered = filtered.filter((job) =>
        category.some((cat) => job.category.includes(cat))
      );
    }
    setFilteredJobs(filtered);
  };

  const handleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">All Jobs</h1>
      <div className="w-full flex flex-wrap">
        <div className="border flex items-center p-2 mt-4 mb-4 w-[93%]">
          <span className="flex mr-4 items-center w-[33%] ">
            <MdOutlineHome className="text-3xl mr-4 ml-2" />
            <span className="flex justify-start w-full">
              <select
                className="border outline-none p-2 w-full text-black"
                id="state"
                name="location"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              >
                <option className="mx-auto w-11" value="">
                  State
                </option>
                {states.map((d, idx) => (
                  <option key={idx} value={d.isoCode}>
                    {d.name}
                  </option>
                ))}
              </select>
            </span>
          </span>

          <span className="flex items-center w-[33%]">
            <MdOutlineHome className="text-3xl mr-4 ml-2" />
            <span className="flex justify-start w-full">
              <select
                className="border outline-none p-2 w-full text-black"
                name="location"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              >
                <option className="mx-auto w-11" value="">
                  City
                </option>
                {cities.map((d, idx) => (
                  <option key={idx} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </span>
          </span>

          <span className="flex items-center w-[33%] ml-2">
            <CategoryIcon className="text-3xl mr-4 ml-2" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-black w-full">
                  Category
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full">
                {categoryList.map((value, index) => (
                  <div key={index}>
                    <DropdownMenuItem onClick={() => handleCategory(value)}>
                      {value} {category.includes(value) ? <TiTick /> : ""}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
      </div>

      <div className="grid gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job, index) => {
          const creationDate = new Date(job.createdOn);
          const differenceInMilliseconds = Date.now() - creationDate;
          const differenceInDays = Math.floor(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );
          const isActiveCondition = job.isActive ? "" : "bg-red-200";
          return (
            <JobCard
              job={job}
              index={index}
              differenceInDays={differenceInDays}
              isActiveCondition={isActiveCondition}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ViewAllJobs;
