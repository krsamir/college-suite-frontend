import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const DepartmentAndPosition = () => {
  const [data, setData] = useState([
    {
      position_id: "",
      position: "",
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
        position_id: "",
        position: "",
      },
    ];
    setData(values);
  };
  const handleExit = () => {
    setData([
      {
        position_id: "",
        position: "",
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
      .post("/api/create_position", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Positions{" "}
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
            Create Positions
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
                    <Form.Label>Position Id</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter Position id"
                      name="position_id"
                      value={value.position_id}
                      onChange={(e) => {
                        handleChange(index, e.target);
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
                      value={value.position}
                      onChange={(e) => {
                        handleChange(index, e.target);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicName">
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
    </>
  );
};

export default DepartmentAndPosition;
