import React, { useEffect, useState } from "react";
import { Alert, Table, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import FileSaver from "file-saver";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {URL} from "../../Constants"

const ManageUploadedAssignment = () => {
  const animatedComponents = makeAnimated();
  const [semester, setSemester] = useState([]);
  const [section, setSection] = useState([]);
  const [subject, setSubject] = useState([]);
  const [department, setDepartment] = useState([]);
  const [disableOption, setDisableOption] = useState({
    semester: false,
    section: false,
    subject: false,
    department: false,
  });
  const obj = { value: "", label: "" };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}/api/assignment`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));

    axios
      .get(`${URL}/api/details`)
      .then((res) => {
        setSemester(res.data[0]);
        setSection(res.data[1]);
        setSubject(res.data[2]);
        setDepartment(res.data[3]);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleFileDownload = (value) => {
    const { filename, mimetype } = value;
    axios({
      url: `${URL}/api/download`,
      method: "POST",
      responseType: "arraybuffer",
      data: { filename },
    })
      .then((res) => {
        var blob = new Blob([res.data], { type: mimetype });
        FileSaver.saveAs(blob, filename);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (value, action) => {
    const options = { ...disableOption };
    console.log(options);
    let finalQuery = "";
    if (value.length === 0) {
      value = "";
    } else {
      value.map((value) => (finalQuery = finalQuery + value.value + ","));
      value = finalQuery.slice(0, -1);
    }
    if (action.name === "semester") {
      options["semester"] = false;
      options["section"] = true;
      options["subject"] = true;
      options["department"] = true;
      setDisableOption(options);
      console.error("Semster");
      console.log(value);
    }
    if (action.name === "section") {
      options["semester"] = true;
      options["section"] = false;
      options["subject"] = true;
      options["department"] = true;
      setDisableOption(options);
      console.error("section");
      console.log(value);
    }
    if (action.name === "subject") {
      options["semester"] = true;
      options["section"] = true;
      options["subject"] = false;
      options["department"] = true;
      setDisableOption(options);
      console.error("subject");
      console.log(value);
    }
    if (action.name === "department") {
      options["semester"] = true;
      options["section"] = true;
      options["subject"] = true;
      options["department"] = false;
      setDisableOption(options);
      console.error("department");
      console.log(value);
    }
  };
  return (
    <div>
      <Alert variant="success">Manage Assignment</Alert>
      <Alert variant="primary">
        <div>Filters: </div>
        <Row>
          <Col>
            <label htmlFor="semester">Semester</label>
            <Select
              isDisabled={disableOption.semester}
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[options[1]]}
              isMulti
              options={semester.map((val) => {
                obj.value = val.semester;
                obj.label = val.semester;
                return { value: obj.value, label: obj.label };
              })}
              name="semester"
              // value={options.filter((val) =>
              //   val.value.includes(value.department)
              // )}
              onChange={(value, action) => {
                handleChange(value, action);
              }}
            />
          </Col>
          <Col>
            <label htmlFor="section">Section</label>
            <Select
              isDisabled={disableOption.section}
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[options[1]]}
              isMulti
              options={section.map((val) => {
                obj.value = val.section;
                obj.label = val.section;
                return { value: obj.value, label: obj.label };
              })}
              name="section"
              // value={options.filter((val) =>
              //   val.value.includes(value.department)
              // )}
              onChange={(value, action) => {
                handleChange(value, action);
              }}
            />
          </Col>

          <Col>
            <label htmlFor="subject">Subject</label>

            <Select
              isDisabled={disableOption.subject}
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[options[1]]}
              isMulti
              options={subject.map((val) => {
                obj.value = val.subject;
                obj.label = val.subject;
                return { value: obj.value, label: obj.label };
              })}
              name="subject"
              // value={options.filter((val) =>
              //   val.value.includes(value.department)
              // )}
              onChange={(value, action) => {
                handleChange(value, action);
              }}
            />
          </Col>
          <Col>
            <label htmlFor="department">Department</label>
            <Select
              isDisabled={disableOption.department}
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={[options[1]]}
              isMulti
              options={department.map((val) => {
                obj.value = val.department;
                obj.label = val.department;
                return { value: obj.value, label: obj.label };
              })}
              name="department"
              // value={options.filter((val) =>
              //   val.value.includes(value.department)
              // )}
              onChange={(value, action) => {
                handleChange(value, action);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() =>
                setDisableOption({
                  semester: false,
                  section: false,
                  subject: false,
                  department: false,
                })
              }
              style={{ marginTop: "20px" }}
            >
              Reset Filters
            </Button>
          </Col>
        </Row>

        <div style={{ display: "flex", flexDirection: "row" }}> </div>
      </Alert>
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
