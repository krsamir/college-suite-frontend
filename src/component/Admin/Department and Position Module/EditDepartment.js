import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  successToast,
  ErrorToast,
  warningToast,
} from "../../../Redux/Actions/ToastAction";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeToken } from "../../../Redux/Actions/TokenAction";

const EditDepartment = (props) => {
  const { history, removeToken } = props;
  const [position, setPosition] = useState([]);
  const updatePosition = () => {
    axios
      .get("/api/getDepartment")
      .then((res) => setPosition(res.data))
      .catch((e) => {
        console.log(e);
        removeToken();
        history.push("/");
      });
  };
  useEffect(() => {
    axios
      .get("/api/getDepartment")
      .then((res) => {
        setPosition(res.data);
      })
      .catch((e) => {
        console.log(e);
        removeToken();
        history.push("/");
      });
  }, [removeToken, history]);
  const [show, setShow] = useState(false);
  const [handleInput, setHandleInput] = useState({
    id: "",
    dept_id: "",
    dept_name: "",
    section: "",
    status: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (value) => {
    setHandleInput({
      id: value.id,
      dept_id: value.dept_id,
      dept_name: value.dept_name,
      section: value.section,
      status: value.status,
    });
    handleShow();
  };
  const handleDelete = (value) => {
    axios
      .put("/api/deleteDepartment", { id: value.id })
      .then((res) => {
        if (res.data === "success") {
          props.successToast("Department Deleted Successfully!");
          updatePosition();
        }
      })
      .catch((e) => {
        props.ErrorToast("Department cannot be Deleted due to some issue!");
        console.log(e);
        removeToken();
        history.push("/");
      });
  };
  const handleChange = (e) => {
    const values = { ...handleInput };
    values[e.target.name] = e.target.value;
    setHandleInput(values);
  };
  const handleSave = () => {
    if (handleInput.dept_id === "") {
      props.warningToast("Department ID cannot be empty !");
    }
    if (handleInput.dept_name === "") {
      props.warningToast("Department cannot be empty !");
    }
    if (handleInput.dept_id !== "" && handleInput.dept_name !== "") {
      axios
        .put("/api/editDepartment", handleInput)
        .then((res) => {
          if (res.data.status === "success") {
            props.successToast("Department updated Successfully!");
            setHandleInput({
              id: "",
              dept_id: "",
              dept_name: "",
              section: "",
            });
            updatePosition();
            handleClose();
          } else if (res.data.status === "duplicate") {
            props.warningToast(
              "Department Id cannot be updated. It is already present in the table."
            );
          }
        })
        .catch((e) => {
          console.log(e);
          props.ErrorToast("Department cannot be updated due to some issue!");
          removeToken();
          history.push("/");
        });
    }
  };
  const handleModalExit = () => {
    setHandleInput({
      id: "",
      dept_id: "",
      dept_name: "",
      section: "",
      status: "",
    });
  };

  return (
    <div>
      <h4>Department</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Department ID</th>
            <th>Department</th>
            <th>Sections</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {position.length !== 0 &&
            position.map((value, index) => {
              return (
                value.status === "1" && (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.dept_id}</td>
                    <td>{value.dept_name}</td>
                    <td>{value.section}</td>
                    <td
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
                    </td>
                  </tr>
                )
              );
            })}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        onExit={handleModalExit}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ display: "flex", flex: "1" }}>
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formBasicemployee_id">
                <Form.Label>Department ID</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Position id"
                  name="dept_id"
                  value={handleInput.dept_id}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicName">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Department"
                  name="dept_name"
                  value={handleInput.dept_name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicName">
                <Form.Label>Section</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter sections"
                  name="section"
                  value={handleInput.section}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <Form.Text className="text-muted">
                  <span>
                    create multiple sections by separating sections using comma(
                    <strong>,</strong>).
                  </span>
                  <br />
                  <span>ex. A,B,C</span>
                </Form.Text>
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
      <ToastContainer />
    </div>
  );
};

export default connect(null, {
  successToast,
  ErrorToast,
  warningToast,
  removeToken,
})(EditDepartment);
