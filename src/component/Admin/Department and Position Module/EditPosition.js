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
import {URL} from "../../../Constants"

const EditPosition = (props) => {
  const { history, removeToken } = props;
  const [position, setPosition] = useState([]);
  const updatePosition = () => {
    axios
      .get(`${URL}/api/getPosition`)
      .then((res) => setPosition(res.data))
      .catch((e) => {
        console.log(e);
        removeToken();
        history.push("/");
      });
  };
  useEffect(() => {
    axios
      .get(`${URL}/api/getPosition`)
      .then((res) => {
        setPosition(res.data);
      })
      .catch((e) => {
        console.log(e);
        removeToken();
        history.push("/");
      });
  }, [history, removeToken]);
  const [show, setShow] = useState(false);
  const [handleInput, setHandleInput] = useState({
    id: "",
    position_id: "",
    position: "",
    status: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (value) => {
    setHandleInput({
      id: value.id,
      position_id: value.position_id,
      position: value.position,
      status: value.status,
    });
    handleShow();
  };
  const handleDelete = (value) => {
    axios
      .put(`${URL}/api/deletePosition`, { id: value.id })
      .then((res) => {
        if (res.data === "success") {
          props.successToast("Position Deleted Successfully!");
          updatePosition();
        }
      })
      .catch((e) => {
        console.log(e);
        props.ErrorToast("Position cannot be Deleted due to some issue!");
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
    if (handleInput.position_id === "") {
      props.warningToast("Position ID cannot be empty !");
    }
    if (handleInput.position === "") {
      props.warningToast("Position cannot be empty !");
    }
    if (handleInput.position_id !== "" && handleInput.position !== "") {
      axios
        .put(`${URL}/api/editPosition`, handleInput)
        .then((res) => {
          if (res.data.status === "success") {
            props.successToast("Position updated Successfully!");
            setHandleInput({
              id: "",
              position_id: "",
              position: "",
            });
            updatePosition();
            handleClose();
          } else if (res.data.status === "duplicate") {
            props.warningToast(
              "Position Id cannot be updated. It is already present in the table."
            );
          }
        })
        .catch((e) => {
          console.log(e);
          props.ErrorToast("Position cannot be updated due to some issue!");
          removeToken();
          history.push("/");
        });
    }
  };
  const handleModalExit = () => {
    setHandleInput({
      id: "",
      position_id: "",
      position: "",
      status: "",
    });
  };

  return (
    <div>
      <h4>Position</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Position ID</th>
            <th>Position</th>
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
                    <td>{value.position_id}</td>
                    <td>{value.position}</td>
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
            Edit Positions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formBasicemployee_id">
                <Form.Label>Position ID</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Position id"
                  name="position_id"
                  value={handleInput.position_id}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicName">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Position"
                  name="position"
                  value={handleInput.position}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
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
})(EditPosition);
