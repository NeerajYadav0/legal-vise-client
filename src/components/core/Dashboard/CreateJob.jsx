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

const CreateJob = () => {
  const { createJob } = useContext(UserContext);

  const [formData, setFormData] = useState({
    jobName: "",
    jobDesc: "",
    category: "",
    jobLocation: "",
    state: "",
    city: "",
    jobPincode: "",
    isActive: true,
  });

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
    });
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
    const id = localStorage.getItem("id");
    console.log(id);

    try {
      await createJob(id, formData);
      setFormData({
        jobName: "",
        jobDesc: "",
        category: "",
        jobLocation: "",
        state: "",
        city: "",
        jobPincode: "",
        isActive: null,
      });
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
