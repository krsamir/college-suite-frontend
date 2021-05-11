import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import axios from "axios";
import FileSaver from "file-saver";
const ManageUploadedAssignment = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/assignment")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleFileDownload = (value) => {
    const { filename } = value;
    axios({
      url: "/api/download",
      method: "POST",
      responseType: "arraybuffer",
      data: { filename },
    })
      .then((res) => {
        var blob = new Blob([res.data], { type: value.mimetype });
        FileSaver.saveAs(blob, filename);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <Alert variant="success">Manage Assignment</Alert>
      <Table striped bordered hover variant="dark" style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Department</th>
            <th>Subject Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Registration No</th>
            <th>FileName</th>
            <th>Uploaded At</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 &&
            data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.department}</td>
                  <td>{value.subject_name}</td>
                  <td>{value.section}</td>
                  <td>{value.semester}</td>
                  <td>{value.regd_no}</td>
                  <td>{value.filename}</td>
                  <td>{value.uploadedat}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <i
                      className="fas fa-download"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleFileDownload(value)}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUploadedAssignment;
