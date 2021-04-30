import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const ManageSubject = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    document.title = "Manage Subjects";
    const tableData = async () => {
      await axios
        .get("/api/getSubject")
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    tableData();
  }, []);
  const updateTable = async () => {
    await axios
      .get("/api/getSubject")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleApprove = async (value) => {
    const status = "APPROVED";
    const { id, isActive } = value;
    await axios
      .put(`/api/editSubject`, { id, status, isActive })
      .then((res) => {
        updateTable();
      })
      .catch((e) => console.log(e));
  };
  const handleReject = async (value) => {
    const status = "PENDING";
    const { id, isActive } = value;
    await axios
      .put(`/api/editSubject`, { id, status, isActive })
      .then((res) => {
        updateTable();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <h3>Manage Subjects</h3>
      {data.length !== 0 && (
        <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Semester</th>
              <th>Department</th>
              <th>Subject Active to students</th>
              <th>Status</th>
              <th>Approve Subject</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 &&
              data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.subjectCode}</td>
                    <td>{value.subjectName}</td>
                    <td>{value.semester}</td>
                    <td>{value.department}</td>
                    <td>{value.isActive === 1 ? "YES" : "NO"}</td>
                    <td>{value.status}</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {value.status === "PENDING" ? (
                        <i
                          className="fas fa-thumbs-up"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleApprove(value)}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-thumbs-down"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleReject(value)}
                        ></i>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageSubject;
