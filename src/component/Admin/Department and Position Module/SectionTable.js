import React, { useEffect, useState } from "react";
import { Table, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { URL } from "../../../Constants";
import axios from "axios";
function SectionTable() {
  const [section, setSection] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [id, setId] = useState(-1);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const getSubjects = () => {
      axios
        .get(`${URL}/api/getSection`)
        .then((res) => setSection(res.data))
        .catch((e) => {
          console.log(e);
        });
    };
    const getTeacher = () => {
      axios
        .get(`${URL}/api/getTeacher`)
        .then((res) => setTeacher(res.data))
        .catch((e) => {
          console.log(e);
        });
    };
    getTeacher();
    getSubjects();
  }, []);
  const handleSave = () => {
    axios
      .post(`${URL}/api/editSection`, { id, name })
      .then((res) => {
        getTeacherUpdated();
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTeacherUpdated = () => {
    axios
      .get(`${URL}/api/getSection`)
      .then((res) => {
        setSection(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInactive = (value) => {
    const { id } = value;
    axios
      .post(`${URL}/api/deleteSection`, { id })
      .then((res) => {
        getTeacherUpdated();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {section.length !== 0 && (
        <div>
          <span style={{ color: "red" }}>
            ** Click on Allocated Teacher to edit or Add a new one.
          </span>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Subject Name</th>
                <th>Section</th>
                <th>Allocated Teacher</th>
                <th>Delete Section</th>
              </tr>
            </thead>
            <tbody>
              {section.map((value, index) => {
                return (
                  value.status === 1 && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.dept_name}</td>
                      <td>{value.subject_name}</td>
                      <td>{value.section}</td>
                      <td
                        onClick={() => {
                          setName(
                            value.allocated_teacher === null
                              ? ""
                              : value.allocated_teacher
                          );
                          setId(value.id);
                          handleShow();
                        }}
                      >
                        {value.allocated_teacher === null ||
                        value.allocated_teacher === ""
                          ? "-"
                          : value.allocated_teacher}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <i
                          className="fas fa-trash-alt"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleInactive(value)}
                        ></i>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="sm"
        // onExit={handleExit}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ display: "flex", flex: "1" }}>
            Allocate Teacher
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Teacher</Form.Label>
                <Form.Control
                  as="select"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                >
                  <option value="">Select a teacher</option>
                  {teacher.map((val, index) => (
                    <option key={index} value={val.name}>
                      {val.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
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
    </div>
  );
}

export default SectionTable;
