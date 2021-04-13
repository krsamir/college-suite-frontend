import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
const TeacherTable = () => {
  const [teacherData, setTeacherData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/getTeacher")
      .then((res) => setTeacherData(res.data))
      .catch((e) => console.log(e));
  }, []);

  //   const handleEdit = () => {};
  //   const handleDelete = () => {};
  return (
    <div>
      <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Date of Joining</th>
            <th>Contact</th>
            <th>Hod</th>
            <th>Created By</th>
            {/* <th>Edit/Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {teacherData.length !== 0 &&
            teacherData.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.employee_id}</td>
                  <td>{value.name}</td>
                  <td>{value.department}</td>
                  <td>{value.position}</td>
                  <td>{value.date_of_joining}</td>
                  <td>{value.contact}</td>
                  <td>{value.isHod === "1" ? "Yes" : "No"}</td>
                  <td>{value.created_by}</td>
                  {/* <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <i
                      className="fas fa-pencil-alt"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(value)}
                    ></i>
                    <i
                      className="fas fa-trash-alt"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(value)}
                    ></i>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default TeacherTable;
