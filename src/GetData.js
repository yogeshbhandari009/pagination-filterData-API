import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function GetData() {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [accountsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredUsers.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setUser(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  const handleChange = (event) => {
    let data = user.filter((data) => {
      if (event.target.value !== "") {
        return (
          data.title.includes(event.target.value) ||
          data.body.includes(event.target.value)
        );
      } else {
        return true;
      }
    });
    setFilteredUsers(data);
    setCurrentPage(1); 
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
        <input type="text" onChange={handleChange} placeholder="Search..." />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ fontWeight: 600 }}>
                ID
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>
                Title
              </TableCell>
              <TableCell align="right" style={{ fontWeight: 600 }}>
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAccounts?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Pagination
            count={Math.ceil(filteredUsers.length / accountsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </TableContainer>
    </div>
  );
}

export default GetData;
