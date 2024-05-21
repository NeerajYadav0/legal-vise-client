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

const CreateJob = () => {
  const { createJob } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [check, setCheck] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleOnSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const id = localStorage.getItem("UserID");
    console.log(id);

    try {
      await createJob(id, { ...formData, files });
      setFormData({
        jobName: "",
        jobDesc: "",
        category: "",
        jobLocation: "",
        state: "",
        city: "",
        jobPincode: "",
        isActive: null,
        files: [],
      });
      setFiles([]);
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
                  placeholder="Name of Student"
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
                  placeholder="Roll Number of Student"
                  onChange={handleOnChange}
                  value={formData.jobDesc}
                  name="jobDesc"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Class of student"
                  type="text"
                  onChange={handleOnChange}
                  value={formData.category}
                  name="category"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="section">Location</Label>
                <Input
                  id="jobLocation"
                  placeholder="Section of student"
                  onChange={handleOnChange}
                  value={formData.jobLocation}
                  name="jobLocation"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  onChange={handleOnChange}
                  value={formData.state}
                  name="state"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  onChange={handleOnChange}
                  value={formData.city}
                  name="city"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jobPincode">Pin Code</Label>
                <Input
                  id="jobPincode"
                  onChange={handleOnChange}
                  value={formData.jobPincode}
                  name="jobPincode"
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
                {files.length != 0 ? (
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

                        // interval={5000};
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
                      <CarouselPrevious className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
                      <CarouselNext className="text-white bg-gray-800 opacity-75 hover:opacity-100" />
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
