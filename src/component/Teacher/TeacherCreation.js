import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TeacherTable from "./TeacherTable";
import { URL } from "../../Constants";
import SectionWiseTeacherHead from "./SectionWiseTeacherHead";
const TeacherUpdate = (props) => {
  const [deptArray, setDeptArray] = useState([{ value: "", label: "" }]);
  const [positionArray, setPositionArray] = useState([
    { value: "", label: "" },
  ]);
  useEffect(() => {
    document.title = "Create Teacher";
    const deptObj = { value: "", label: "" };
    const getDepartment = async () => {
      await axios
        .get(`${URL}/api/getDepartment`)
        .then((res) => {
          const deptArrays = res.data.map((val) => {
            deptObj.value = val.dept_name;
            deptObj.label = val.dept_name;
            return { value: deptObj.value, label: deptObj.label };
          });
          setDeptArray(deptArrays);
          // { value: "chocolate", label: "Chocolate" }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getPosition = async () => {
      await axios
        .get(`${URL}/api/getPosition`)
        .then((res) => {
          const positionArrays = res.data.map((val) => {
            deptObj.value = val.position;
            deptObj.label = val.position;
            return { value: deptObj.value, label: deptObj.label };
          });
          setPositionArray(positionArrays);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getDepartment();
    getPosition();
  }, []);
  const [data, setData] = useState([
    {
      employee_id: Date.now(),
      name: "",
      department: "",
      date_of_joining: "",
      position: "",
      contact: "",
      isHod: false,
      password: Date.now(),
    },
  ]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const animatedComponents = makeAnimated();
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const handleAdd = () => {
    var values = [...data];
    values = [
      ...data,
      {
        employee_id: Date.now(),
        name: "",
        department: "",
        date_of_joining: "",
        position: "",
        contact: "",
        isHod: false,
        password: Date.now(),
      },
    ];
    setData(values);
  };
  const handleExit = () => {
    setData([
      {
        employee_id: Date.now(),
        name: "",
        department: "",
        date_of_joining: "",
        position: "",
        contact: "",
        isHod: false,
        password: Date.now(),
      },
    ]);
  };
  const handleChange = (index, target, selectIndex) => {
    const values = [...data];
    if (target.name === "department" || target.name === "position") {
      let finalQuery = "";
      //  SelectedIndex is the index
      // here index = value
      // here target is action which consists name
      if (index.length === 0) {
        index = "";
      } else {
        index.map((value) => (finalQuery = finalQuery + value.value + ","));
        index = finalQuery.slice(0, -1);
      }
      // final value
      values[selectIndex][target.name] = index;
    } else if (target.name === "isHod") {
      values[index]["isHod"] = target.checked;
    } else {
      values[index][target.name] = target.value;
      // values[index][event.target.name] = event.target.value);
    }
    setData(values);
  };
  const handleRemove = (index) => {
    const values = [...data];
    values.splice(index, 1);
    setData(values);
  };
  const handleSave = () => {
    // console.log(data);
    axios
      .post(`${URL}/api/create_teacher`, data)
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        Create Teacher{" "}
        <i className="fas fa-pencil-alt" style={{ cursor: "pointer" }}></i>
      </Button>
      <SectionWiseTeacherHead />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        onExit={handleExit}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ display: "flex", flex: "1" }}>
            Create Teacher
          </Modal.Title>
          <Button
            style={{
              marginRight: "20px",
            }}
            onClick={handleAdd}
          >
            <i className="fas fa-plus"></i>
            {"  "}Add
          </Button>
        </Modal.Header>
        <Modal.Body>
          {data.map((value, index) => (
            <div key={index}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicemployee_id">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter employee id"
                      name="employee_id"
                      value={value.employee_id}
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter name"
                      name="name"
                      value={value.name}
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasiccontact">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter contact no."
                      name="contact"
                      value={value.contact}
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicposition">
                    <Form.Label>Select Position</Form.Label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={[options[1]]}
                      isMulti
                      options={positionArray}
                      name="position"
                      // value={value.position}
                      onChange={(value, action) => {
                        handleChange(value, action, index);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicdept">
                    <Form.Label>Select Department</Form.Label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={[options[1]]}
                      isMulti
                      options={deptArray}
                      name="department"
                      // value={options.filter((val) =>
                      //   val.value.includes(value.department)
                      // )}
                      onChange={(value, action) => {
                        handleChange(value, action, index);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicdoj">
                    <Form.Label>Date of Joining</Form.Label>
                    <Form.Control
                      type="date"
                      value={value.date_of_joining}
                      placeholder="Enter date of joining"
                      name="date_of_joining"
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col style={{ display: "flex", flex: "1" }}>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Label>Head Of Department </Form.Label>
                    <Form.Check
                      type="checkbox"
                      value={value.isHod}
                      label="is he/she head of the department ?"
                      name="isHod"
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Button
                  style={{ marginBottom: "20px", marginRight: "50px" }}
                  onClick={() => handleRemove(index)}
                >
                  <i className="fas fa-minus"></i>
                  {"  "}Remove
                </Button>
              </Row>
              <hr />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <TeacherTable />
    </>
  );
};

export default TeacherUpdate;
