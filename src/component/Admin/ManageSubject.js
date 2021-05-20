import React, { useState, useEffect } from "react";
import { Table, Alert, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import { URL } from "../../Constants";
const ManageSubject = () => {
  const [data, setData] = useState([]);
  const [currentSemster, setCurrentSemster] = useState("");
  const [allSections, setAllSections] = useState([]);
  useEffect(() => {
    document.title = "Manage Subjects";
    const tableData = async () => {
      await axios
        .get(`${URL}/api/getSubject`)
        .then((res) => {
          setData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    tableData();
    const getCurrentSemester = async () => {
      await axios
        .get(`${URL}/api/getSemester`)
        .then((res) => {
          res.data[0].current_semester % 2 === 0
            ? setCurrentSemster("Even")
            : setCurrentSemster("Odd");
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCurrentSemester();
    const getAllSec = async () => {
      await axios
        .get(`${URL}/api/getSection`)
        .then((res) => {
          setAllSections(res.data);
        })
        .catch((e) => console.log(e));
    };
    getAllSec();
  }, []);
  const updateTable = async () => {
    await axios
      .get(`${URL}/api/getSubject`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleApprove = async (value) => {
    const { department, subjectName, subjectCode, approved_once } = value;
    const selected_subject = department.split(",");
    const allsec = selected_subject.map((val) =>
      allSections
        .map((value) => {
          if (value.dept_name === val)
            return { deptName: value.dept_name, dept_section: value.section };
          else return null;
        })
        .filter((val) => val != null)
    );
    const existingUniqueSection = allsec
      .map((value) => _.uniqBy(value, "dept_section"))
      .filter((value) => value.length !== 0);
    const fullArray = [].concat(...existingUniqueSection);

    const arrayData = fullArray.map((value) => {
      const { deptName, dept_section } = { ...value };
      return {
        departmentName: deptName,
        section: dept_section,
        subjectName,
        subjectCode,
      };
    });
    if (approved_once === null) {
      await axios
        .post(`${URL}/api/createSection`, [arrayData])
        .then((res) => {
          alert("Inserted new Sections too !");
        })
        .catch((e) => console.log(e));
    }
    const status = "APPROVED";
    const { id, isActive } = value;
    await axios
      .put(`${URL}/api/editSubject`, { id, status, isActive })
      .then((res) => {
        updateTable();
      })
      .catch((e) => console.log(e));
  };
  const handleReject = async (value) => {
    const status = "PENDING";
    const { id, isActive } = value;
    await axios
      .put(`${URL}/api/editSubject`, { id, status, isActive })
      .then((res) => {
        updateTable();
      })
      .catch((e) => console.log(e));
  };
  const addSemester = () => {
    axios
      .get(`${URL}/api/addSemester`)
      .then((resp) => {
        console.log(resp.data);
        getCurrentSemesterOnChange();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const reduceSemester = () => {
    axios
      .get(`${URL}/api/reduceSemester`)
      .then((resp) => {
        getCurrentSemesterOnChange();
        console.log(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getCurrentSemesterOnChange = async () => {
    await axios
      .get(`${URL}/api/getSemester`)
      .then((res) => {
        res.data[0].current_semester % 2 === 0
          ? setCurrentSemster("Even")
          : setCurrentSemster("Odd");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <Alert variant="success">Change Current Semester</Alert>
      <Row>
        <Col>
          <ButtonGroup size="lg" className="mb-2">
            <Button onClick={reduceSemester}>
              <i className="fas fa-minus"></i>
            </Button>
            <Button disabled>Change Semester</Button>
            <Button onClick={addSemester}>
              <i className="fas fa-plus"></i>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Alert variant="dark" style={{ width: "290px" }}>
            Current semseter is {currentSemster} Semster.
          </Alert>
        </Col>
      </Row>
      <hr />
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
              <th>Approve / Disapprove Subject</th>
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
