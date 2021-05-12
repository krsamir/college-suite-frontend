import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, FormControl, Form } from "react-bootstrap";
import {
  successToast,
  ErrorToast,
  warningToast,
} from "../../../Redux/Actions/ToastAction";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeToken } from "../../../Redux/Actions/TokenAction";
import { adminUtils } from "../../../Redux/Actions/AdminAction";
import {URL} from "../../../Constants"
const NoticeTable = (props) => {
  const { adminUtils, notice, history } = props;
  // console.log(props.update);
  // const [notice, setNotice] = useState([]);
  // const updateNotice = () => {
  //   axios
  //     .get("/api/get_notice")
  //     .then((res) => setNotice(res.data))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  useEffect(() => {
    adminUtils();
  }, [adminUtils]);
  const [show, setShow] = useState(false);
  const [handleInput, setHandleInput] = useState({
    id: "",
    noticeTitle: "",
    noticeBody: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (value) => {
    setHandleInput({
      id: value.id,
      noticeTitle: value.Title,
      noticeBody: value.body,
    });
    handleShow();
  };
  const handleDelete = (value) => {
    axios
      .put(`${URL}/api/delete_notice`, { id: value.id })
      .then((res) => {
        if (res.data === "success") {
          props.successToast("Notice Deleted Successfully!");
          adminUtils();
        }
      })
      .catch((e) => {
        console.log(e);
        props.ErrorToast("Notice cannot be Deleted due to some issue!");
        props.removeToken();
        history.push("/");
      });
  };
  const handleChange = (e) => {
    const values = { ...handleInput };
    values[e.target.name] = e.target.value;
    setHandleInput(values);
  };
  const handleSave = () => {
    if (handleInput.noticeTitle === "") {
      props.warningToast("Title cannot be empty !");
    }
    if (handleInput.noticeBody === "") {
      props.warningToast("Body cannot be empty !");
    }
    if (handleInput.noticeTitle !== "" && handleInput.noticeBody !== "") {
      axios
        .put(`${URL}/api/edit_notice`, handleInput)
        .then((res) => {
          if (res.data === "success") {
            props.successToast("Notice updated Successfully!");
            setHandleInput({
              id: "",
              noticeTitle: "",
              noticeBody: "",
            });
            adminUtils();
            handleClose();
          }
        })
        .catch((e) => {
          console.log(e);
          props.ErrorToast("Notice cannot be updated due to some issue!");
          props.removeToken();
          history.push("/");
        });
    }
  };
  const handleModalExit = () => {
    setHandleInput({
      id: "",
      noticeTitle: "",
      noticeBody: "",
    });
  };

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Notice</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {notice.length !== 0 &&
            notice.map((value, index) => {
              return (
                value.status === "1" && (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.Title}</td>
                    <td>{value.body}</td>
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
        centered
        onExit={handleModalExit}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Title</Form.Label>
            <FormControl
              type="text"
              placeholder="Title"
              name="noticeTitle"
              onChange={(e) => handleChange(e)}
              className="mr-sm-2"
              maxLength="200"
              value={handleInput.noticeTitle}
              required
            />
            <Form.Label>Body</Form.Label>
            <Form.Control
              name="noticeBody"
              as="textarea"
              placeholder="Body"
              value={handleInput.noticeBody}
              rows={3}
              onChange={(e) => handleChange(e)}
              maxLength="2000"
              required
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  notice: state.admin.data,
});

export default connect(mapStateToProps, {
  successToast,
  ErrorToast,
  warningToast,
  removeToken,
  adminUtils,
})(NoticeTable);
