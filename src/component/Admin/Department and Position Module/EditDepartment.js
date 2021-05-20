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
import { URL } from "../../../Constants";
import SectionTable from "./SectionTable";
import { Spinner } from "react-bootstrap";

const EditDepartment = (props) => {
  const { history, removeToken } = props;
  const [position, setPosition] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const updatePosition = () => {
    axios
      .get(`${URL}/api/getDepartment`)
      .then((res) => setPosition(res.data))
      .catch((e) => {
        console.log(e);
        removeToken();
        history.push("/");
      });
  };
  useEffect(() => {
    const getDepartments = () => {
      axios
        .get(`${URL}/api/getDepartment`)
        .then((res) => {
          setPosition(res.data);
        })
        .catch((e) => {
          console.log(e);
          removeToken();
          history.push("/");
        });
    };
    getDepartments();
    const getSubjects = () => {
      axios
        .get(`${URL}/api/getSubject`)
        .then((res) => setSubject(res.data))
        .catch((e) => {
          console.log(e);
          removeToken();
          history.push("/");
        });
    };
    getSubjects();
  }, [removeToken, history]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [handleInput, setHandleInput] = useState({
    id: "",
    dept_id: "",
    dept_name: "",
    status: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);

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
      .put(`${URL}/api/deleteDepartment`, { id: value.id })
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
        .put(`${URL}/api/editDepartment`, handleInput)
        .then((res) => {
          if (res.data.status === "success") {
            props.successToast("Department updated Successfully!");
            setHandleInput({
              id: "",
              dept_id: "",
              dept_name: "",
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
      status: "",
    });
  };

  const [departmentData, setDepartmentData] = useState({
    dept_id: "",
    dept_name: "",
  });
  const [sectionArray, setsectionArray] = useState([]);
  const [sectionData, setSectionData] = useState([{ section: "" }]);
  const handleSection = async (value) => {
    setLoading(true);
    const { dept_id, dept_name } = value;
    setDepartmentData({ dept_id, dept_name });
    await axios
      .post(`${URL}/api/getSectionByDept`, { dept_name })
      .then((res) => {
        const sect = res.data.map((val) => val.section);
        setsectionArray(sect);
        handleShow1();
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const handleAdd = () => {
    var values = [...sectionData];
    values = [
      ...sectionData,
      {
        section: "",
      },
    ];
    setSectionData(values);
  };
  const handleOnChangeSections = (e, index) => {
    const target = e.target;
    const values = [...sectionData];
    values[index][target.name] = target.value;
    setSectionData(values);
  };
  const handleRemove = (index) => {
    const values = [...sectionData];
    values.splice(index, 1);
    setSectionData(values);
  };
  const handleSave1 = async () => {
    if (sectionData[0].section === "") {
      alert("Select at least one section !!");
    } else {
      const departmentName = departmentData.dept_name;
      const selectedSubject = subject
        .map((value) => {
          if (
            value.department
              .split(",")
              .map((v) => v.toLowerCase())
              .includes(departmentName.toLowerCase())
          ) {
            return {
              subjectName: value.subjectName,
              subjectCode: value.subjectCode,
            };
          } else {
            return null;
          }
        })
        .filter((value) => value !== null);
      const data = sectionData.map((value) =>
        selectedSubject.map((val) => {
          return { ...val, ...value, departmentName };
        })
      );
      const singleArray = [].concat(...data);
      const sectiondataforPost = singleArray.filter(
        (value) => !sectionArray.includes(value.section)
      );
      if (sectiondataforPost.length > 0) {
        await axios
          .post(`${URL}/api/createSection`, sectiondataforPost)
          .then((res) => {
            window.location.reload();
          })
          .catch((e) => console.log(e));
        handleClose1();
      } else {
        props.warningToast("Requested Section Already Exist!");
      }
    }
  };
  const handleModalExit1 = () => {
    setSectionData([{ section: "" }]);
    setsectionArray([]);
  };
  return (
    <div>
      {loading && (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
            zIndex: "9999",
            position: "absolute",
            marginLeft: "40%",
            marginTop: "20%",
          }}
        ></Spinner>
      )}
      <h4>Department</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Department ID</th>
            <th>Department</th>
            <th>Add Sections</th>
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
                    <td>
                      <i
                        style={{ marginLeft: "20px", cursor: "pointer" }}
                        className="fas fa-plus-circle"
                        onClick={() => handleSection(value)}
                      ></i>
                    </td>
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
      {/* 2nd Modal */}
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        size="lg"
        onExit={handleModalExit1}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ display: "flex", flex: "1" }}>
            Add Section
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
          <Row>
            <Col>
              <Form.Group controlId="formBasicemployee_id">
                <Form.Label>Department ID</Form.Label>
                <Form.Control
                  readOnly
                  type="input"
                  placeholder="Enter Position id"
                  name="dept_id"
                  value={departmentData.dept_id}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicName">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  readOnly
                  type="input"
                  placeholder="Enter Department"
                  name="dept_name"
                  value={departmentData.dept_name}
                />
              </Form.Group>
            </Col>
          </Row>
          {sectionData.map((value, index) => (
            <div key={index}>
              {" "}
              <Row>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>section</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="Enter section"
                      name="section"
                      value={value.section}
                      onChange={(e) => handleOnChangeSections(e, index)}
                    />
                  </Form.Group>
                </Col>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    style={{ height: "40px", marginTop: "32px" }}
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
          {}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave1}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <SectionTable {...props} />
      </Row>
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
