import React, { useEffect, useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

function EducationalVideo() {
  const { videoUpload, deleteVideo, getVideo } = React.useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [alert, setAlert] = useState("");
  const [videoData, setVideoData] = useState([]);

  const handelDelete = async (id) => {
    await deleteVideo(id).then(() => {
      setAlert(" ");
    });
  };

  useEffect(() => {
    getVideo().then((data) => {
      console.log(data);
      setVideoData(data);
    });
  }, [alert]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = (files) => {
    setFiles(files);
    setDialogOpen(false);
  };

  const uploadData = async () => {
    if (!title || files.length === 0) {
      setAlert("All fields are required");
      return;
    }

    // Convert data to FormData or any other format you need for the backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", files[0]);
    await videoUpload(formData).then(() => {});
    setAlert(" ");
    setAlert("");
    setTitle("");
    setFiles([]);
    // Call your upload function here
    // uploadFunction(formData);
  };

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">Add Educational video</h1>
      {alert && <p className="text-red-500">{alert}</p>}
      <div className="dropzone-dialog flex justify-between flex-col">
        <div className="w-full flex">
          <div className="w-[30%] mx-auto">
            <Label htmlFor="title" className="text-xl">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title of video"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              name="jobDesc"
              required
              className="text-black"
            />
          </div>
          <div className="flex items-end w-[30%] mx-auto">
            <Button
              onClick={handleDialogOpen}
              variant="outline"
              className="w-full"
            >
              <span className="text-black">Add Video</span>
            </Button>
            <DropzoneDialog
              open={dialogOpen}
              onSave={handleDialogSave}
              acceptedFiles={["video/mp4"]}
              showPreviews={true}
              maxFileSize={50000000000}
              onClose={handleDialogClose}
            />
          </div>
        </div>
        <div className="my-5 flex justify-center">
          <Button onClick={uploadData} variant="outline" className="">
            <span className="text-black">Upload Data</span>
          </Button>
        </div>
        <div className="flex justify-center my-5">
          <TableContainer component={Paper} className="max-w-[800px]">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: "33%" }}>
                    Title
                  </TableCell>
                  <TableCell align="center" sx={{ width: "33%" }}>
                    Watch
                  </TableCell>
                  <TableCell align="center" sx={{ width: "33%" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ...new Map(videoData.map((row) => [row.title, row])).values(),
                ].map((row) => (
                  <TableRow
                    key={row?.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <span>{row?.title}</span>
                    </TableCell>
                    <TableCell align="center">
                      <RemoveRedEyeIcon
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                          window.open(row?.video, "_blank");
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        className="cursor-pointer hover:text-red-700"
                        onClick={() => {
                          handelDelete(row?._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default EducationalVideo;
