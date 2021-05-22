import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../Constants";
import { Table, Modal, Row, Col, Form, Button } from "react-bootstrap";
const SectionWiseTeacherHead = () => {
  const [sectionData, setsectionData] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const handleShow = () => setShow(true);
  const [data, setdata] = useState({ dept_name: "", section: "" });

  useEffect(() => {
    const getSections = async () => {
      await axios
        .get(`${URL}/api/getallSection`)
        .then((res) => {
          setsectionData(res.data);
        })
        .catch((e) => console.log(e));
    };
    const getTeacher = async () => {
      await axios
        .get(`${URL}/api/getTeacher`)
        .then((res) => setTeacher(res.data))
        .catch((e) => {
          console.log(e);
        });
    };
    getSections();
    getTeacher();
  }, []);
  const getTeacherUpdated = () => {
    axios
      .get(`${URL}/api/getallSection`)
      .then((res) => {
        setsectionData(res.data);
      })
      .catch((e) => console.log(e));
  };
  const handleSave = async () => {
    await axios
      .post(`${URL}/api/sectionAdmin`, { name, ...data })
      .then((res) => {
        getTeacherUpdated();
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <h2>Show section Heads</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Department</th>
            <th>Section</th>
            <th>Section Admin</th>
          </tr>
        </thead>
        <tbody>
          {sectionData.length !== 0 &&
            sectionData.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.dept_name}</td>
                  <td>{value.section}</td>
                  <td>
                    {value.sectionadmin === null ||
                    value.sectionadmin === "" ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <i
                          style={{
                            cursor: "pointer",
                          }}
                          className="fas fa-plus-circle"
                          onClick={() => {
                            handleShow();
                            setdata({
                              dept_name: value.dept_name,
                              section: value.section,
                            });
                          }}
                        ></i>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleShow();
                          setdata({
                            dept_name: value.dept_name,
                            section: value.section,
                          });
                        }}
                      >
                        <span>{value.sectionadmin} </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        onExit={() => {
          setName("");
          setdata({ dept_name: "", section: "" });
        }}
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
};

export default SectionWiseTeacherHead;
