import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import {
  successToast,
  ErrorToast,
  warningToast,
} from "../../../Redux/Actions/ToastAction";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeToken } from "../../../Redux/Actions/TokenAction";

const DepartmentComponent = (props) => {
  const { history, removeToken } = props;
  const [data, setData] = useState([
    {
      dept_id: "",
      dept_name: "",
    },
  ]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    var values = [...data];
    values = [
      ...data,
      {
        dept_id: "",
        dept_name: "",
      },
    ];
    setData(values);
  };
  const handleExit = () => {
    setData([
      {
        dept_id: "",
        dept_name: "",
      },
    ]);
  };
  const handleChange = (index, target, selectIndex) => {
    const values = [...data];
    values[index][target.name] = target.value;
    setData(values);
  };
  const handleRemove = (index) => {
    const values = [...data];
    values.splice(index, 1);
    setData(values);
  };
  const handleSave = () => {
    axios
      .post("/api/create_department", data)
      .then((res) => {
        if (res.data.status === "created") {
          props.successToast("Department Created Successfully!");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (res.data.status === "duplicate") {
          props.warningToast("Duplicate Department cannot be created.");
        }
      })
      .catch((error) => {
        console.log(error);
        removeToken();
        history.push("/");
      });
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Department{" "}
        <i className="fas fa-pencil-alt" style={{ cursor: "pointer" }}></i>
      </Button>

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
            Create Department
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
                  <Form.Group controlId="formBasicdepartment_id">
                    <Form.Label>Department Id</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter Department id"
                      name="dept_id"
                      value={value.dept_id}
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter Department Name"
                      name="dept_name"
                      value={value.dept_name}
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="formBasicName"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "50px",
                    }}
                  >
                    <Button
                      style={{ marginTop: "30px" }}
                      onClick={() => handleRemove(index)}
                    >
                      <i className="fas fa-minus"></i>
                      {"  "}Remove
                    </Button>
                  </Form.Group>
                </Col>
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
      <ToastContainer />
    </>
  );
};

export default connect(null, {
  successToast,
  ErrorToast,
  warningToast,
  removeToken,
})(DepartmentComponent);
