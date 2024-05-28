import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/UserContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { State, City } from "country-state-city"; // Import State and City
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TiTick } from "react-icons/ti";
const CreateJob = () => {
  const [categoryError, setCategoryError] = useState("");

  const categoryList = [
    "Lawyer",
    "Notaries",
    "Consultant",
    "Mediator",
    "Legal Researchers",
    "Legal Document Preparer",
    "Legal Translator",
  ];
  const { createJob } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  const [formData, setFormData] = useState({
    jobName: "",
    jobDesc: "",
    category: [],
    jobLocation: "",
    state: "",
    city: "",
    jobPincode: "",
    isActive: true,
    files: [],
  });
  const [category, setCategory] = useState([]);
  const handelCategory = (value) => {
    let updatedCategory = [...category];
    if (updatedCategory.includes(value)) {
      // If the value is already present, remove it
      updatedCategory = updatedCategory.filter((item) => item !== value);
    } else {
      // If the value is not present, add it
      updatedCategory.push(value);
    }
    setCategory(updatedCategory);
    setFormData((prevData) => ({
      ...prevData,
      category: updatedCategory,
    }));
    // Clear category error when a category is selected
    setCategoryError("");
  };

  const states = State.getStatesOfCountry("IN"); // Get states
  const cities = City.getCitiesOfState("IN", formData.state); // Get cities based on selected state

  const handleChange = (event) => {
    setCheck(true);
    const selectedFiles = Array.from(event.target.files); // Convert FileList to an array
    setFiles(selectedFiles); // Update state with the selected files
  };

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Non-Active", value: "Non-Active" },
  ];

  const handleCancel = () => {
    setFormData({
      jobName: "",
      jobDesc: "",
      category: "",
      jobLocation: "",
      state: "",
      city: "",
      jobPincode: "",
      isActive: true,
      files: [],
    });
    setFiles([]);
  };

  const handleSelectChange = (name, value) => {
    value === "Active" ? true : false;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStateChange = (e) => {
    console.log(e);
    setFormData((prevData) => ({
      ...prevData,
      state: e.target.value,
      city: "", // Reset city when state changes
    }));
  };

  const handleCityChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      city: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (category.length === 0) {
      setCategoryError("Category is required");
      return;
    }

    const id = localStorage.getItem("UserID");

    try {
      await createJob(id, { ...formData, files });
      setFormData({
        jobName: "",
        jobDesc: "",
        category: [],
        jobLocation: "",
        state: "",
        city: "",
        jobPincode: "",
        isActive: null,
        files: [],
      });
      setFiles([]);
      setCategory([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <Card className="w-[90%] py-10">
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jobName">Name</Label>
                <Input
                  id="jobName"
                  placeholder="Name of Job"
                  onChange={handleOnChange}
                  value={formData.jobName}
                  name="jobName"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rollNumber">Description</Label>
                <Input
                  id="jobDesc"
                  placeholder="Description of job"
                  onChange={handleOnChange}
                  value={formData.jobDesc}
                  name="jobDesc"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                {categoryError && (
                  <span className="text-red-500">{categoryError}</span>
                )}
                {/* <Input
                  id="category"
                  placeholder="Class of student"
                  type="text"
                  onChange={handleOnChange}
                  value={formData.category}
                  name="category"
                  required
                /> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-black w-full">
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
                            {value} {category.includes(value) ? <TiTick /> : ""}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="section">Location</Label>
                <Input
                  id="jobLocation"
                  placeholder="Location explanation or landmark"
                  onChange={handleOnChange}
                  value={formData.jobLocation}
                  name="jobLocation"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="state">State</Label>
                <select
                  id="state"
                  onChange={handleStateChange}
                  value={formData.state}
                  name="state"
                  className="border outline-none p-2 text-black"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <select
                  id="city"
                  onChange={handleCityChange}
                  value={formData.city}
                  name="city"
                  className="border outline-none p-2 text-black"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.isoCode} value={city.isoCode}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jobPincode">Pin Code</Label>
                <Input
                  id="jobPincode"
                  onChange={handleOnChange}
                  value={formData.jobPincode}
                  name="jobPincode"
                  placeholder="Pincode"
                />
              </div>

              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="isActive">Status</Label>
                <Select
                  name="isActive"
                  onValueChange={(value) =>
                    handleSelectChange("isActive", value)
                  }
                  value={formData.isActive}
                  required={true}
                >
                  <SelectTrigger id="isActive">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">Media</Label>
                <Input
                  id="photos"
                  name="photos"
                  type="file"
                  multiple
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5 mx-auto">
                {files.length !== 0 ? (
                  <>
                    {console.log(files)}
                    <Carousel
                      plugins={[
                        Autoplay({
                          delay: 3000,
                        }),
                      ]}
                      className="lg:w-[1000px]"
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                    >
                      <CarouselContent>
                        {files.map((img, index) => {
                          const imgSrc = URL.createObjectURL(img);
                          return (
                            <CarouselItem key={index}>
                              <img
                                width={600}
                                height={600}
                                src={imgSrc}
                                alt="Image 2"
                                className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-300"
                                style={{
                                  maxHeight: "600px",
                                  width: "auto",
                                  height: "auto",
                                }}
                              />
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                      <CarouselPrevious
                        className="text-white bg-gray-800 opacity-75 hover:opacity-100"
                        onClick={(e) => e.preventDefault()}
                      />
                      <CarouselNext
                        className="text-white bg-gray-800 opacity-75 hover:opacity-100"
                        onClick={(e) => e.preventDefault()}
                      />
                    </Carousel>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJob;
