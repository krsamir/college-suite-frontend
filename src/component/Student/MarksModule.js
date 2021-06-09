import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Table, Container } from "react-bootstrap";
import { URL } from "../../Constants";
const MarksModule = () => {
  const [data, setdata] = useState([]);
  const [profile, setprofile] = useState({
    contact: "",
    department: "",
    name: "",
    regd_no: "",
    year_of_joining: "",
    current_semester: "",
    section: "",
  });
  useEffect(() => {
    const getStudentMarks = async () => {
      await axios
        .get(`${URL}/api/getMarks`)
        .then((res) => {
          setdata(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getStudentDetail = async () => {
      await axios
        .get(`${URL}/api/getStudent`)
        .then((res) => {
          setprofile(res.data[0]);
        })
        .catch((e) => console.log(e));
    };
    getStudentMarks();
    getStudentDetail();
  }, []);

  return (
    <div>
      <Container>
        {data.length === 0 ? (
          <Alert variant="dark">
            Wait! You haven't submitted any assignment.
          </Alert>
        ) : (
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Subject Name</th>
                <th>Uploaded At</th>
                <th>Assigned Marks</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                if (Number(value.semester) === profile.current_semester) {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.subject_name}</td>
                      <td>{value.uploadedat}</td>
                      <td>
                        {value.assignedmarks === null ||
                        value.assignedmarks === ""
                          ? `-`
                          : value.assignedmarks}
                      </td>
                      <td>
                        {value.totalmarks === null || value.totalmarks === ""
                          ? `-`
                          : value.totalmarks}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default MarksModule;
