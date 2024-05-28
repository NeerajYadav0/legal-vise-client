import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function ReportedUsers() {
  const navigate = useNavigate();
  const [res, setRes] = useState([]);
  const { allReportedUsers } = useContext(UserContext);
  const [type, setType] = useState("serviceProvider");
  const [tData, setTdata] = useState([]);

  // Fetch the reported users data only once
  useEffect(() => {
    allReportedUsers().then((data) => {
      console.log(data?.data?.result);
      setRes(data?.data?.result);
    });
  }, [allReportedUsers]);

  // Update the table data when `res` or `type` changes
  useEffect(() => {
    if (res.length > 0) {
      const filteredData = res
        .filter((item) => {
          if (type === "serviceProvider") {
            return item.reportedByType === "client";
          } else if (type === "client") {
            return item.reportedByType === "serviceProvider";
          }
          return false;
        })
        .sort((a, b) => b.count - a.count);
      setTdata(filteredData);
    }
  }, [res, type]);

  return (
    <div className="w-11/12 flex-col justify-center mt-8">
      <h1 className="text-3xl mb-8">Reported Users</h1>
      <div>
        <Tabs defaultValue="serviceProvider" className="w-[100%] text-center">
          <TabsList>
            <TabsTrigger
              value="serviceProvider"
              onClick={() => setType("serviceProvider")}
            >
              Legalist
            </TabsTrigger>
            <TabsTrigger value="client" onClick={() => setType("client")}>
              Client
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-center my-5">
        <TableContainer component={Paper} className="max-w-[800px]">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "50%" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ width: "50%" }}>
                  Report Frequency
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ...new Map(tData.map((row) => [row.userName, row])).values(),
              ].map((row) => (
                <TableRow
                  key={row?.userName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/dashboard/admin-profile-view/${row?.reportedUserId}/${row?.reportedByType}`
                        );
                      }}
                    >
                      {row?.userName}
                    </span>
                  </TableCell>
                  <TableCell align="center">{row?.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ReportedUsers;
