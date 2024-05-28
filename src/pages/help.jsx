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

function Help() {
  const { getVideo } = React.useContext(UserContext);

  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    getVideo().then((data) => {
      console.log(data);
      setVideoData(data);
    });
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 flex-col justify-center mt-8">
        <div className="w-full flex justify-center">
          <h1 className="text-3xl mb-8 text-white ">Help</h1>
        </div>
        <div className="dropzone-dialog flex justify-between flex-col">
          <div className="flex justify-center my-5">
            <TableContainer component={Paper} className="max-w-[800px]">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ width: "33%" }}>
                      Video Title
                    </TableCell>
                    <TableCell align="center" sx={{ width: "33%" }}>
                      Watch
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    ...new Map(
                      videoData.map((row) => [row.title, row])
                    ).values(),
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
