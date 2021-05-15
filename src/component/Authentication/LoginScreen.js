import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./LoginScreen.css";
import {
  successToast,
  warningToast,
  ErrorToast,
} from "../../Redux/Actions/ToastAction";
import { setLoginToken, setRoleToken } from "../../Redux/Actions/TokenAction";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "../../Constants";
// "proxy": "http://localhost:5000",
function LoginScreen(props) {
  const [role, setRole] = useState("");
  const [flag, setFlag] = useState(true);
  const [adminEmail, setAdminEmail] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [ownerEmail, setOwnerEmail] = useState("owner");
  const [ownerPassword, setOwnerPassword] = useState("owner");
  const [studentRegdNo, setStudentRegdNo] = useState("student");
  const [studentPassword, setStudentPassword] = useState("student");
  const [teacherEmpId, setTeacherEmpId] = useState("teacher");
  const [teacherPassword, setTeacherPassword] = useState("teacher");

  const handleAdminLogin = async () => {
    await axios
      .post(`${URL}/api/login-admin`, {
        email: adminEmail,
        password: adminPassword,
      })
      .then((response) => {
        if (response.data === "invaliduser") {
          props.warningToast("Wrong Credentials !");
        } else if (response.data === "usernotfound") {
          props.ErrorToast("User doest not exist ! Contact Administrator !");
        } else {
          props.setRoleToken("admin");
          const { token } = response.data;
          if (token !== undefined && token !== "") {
            props.setLoginToken(token);
            props.history.push("/");
            window.location.reload();
          } else {
            props.history.push("/login");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStudentLogin = async () => {
    await axios
      .post(`${URL}/api/login-student`, {
        regdno: studentRegdNo,
        password: studentPassword,
      })
      .then((response) => {
        if (response.data === "invaliduser") {
          props.warningToast("Wrong Credentials !");
        } else if (response.data === "usernotfound") {
          props.ErrorToast("User doest not exist ! Contact Administrator !");
        } else {
          const { token } = response.data;
          if (token !== undefined && token !== "") {
            props.setRoleToken("student");
            props.setLoginToken(token);
            props.history.push("/");
            window.location.reload();
          } else {
            props.history.push("/login");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOwnerLogin = async () => {
    await axios
      .post(`${URL}/api/login-owner`, {
        email: ownerEmail,
        password: ownerPassword,
      })
      .then((response) => {
        if (response.data === "invaliduser") {
          props.warningToast("Wrong Credentials !");
        } else if (response.data === "usernotfound") {
          props.ErrorToast("User doest not exist ! Contact Administrator !");
        } else {
          const { token } = response.data;
          if (token !== undefined && token !== "") {
            props.setRoleToken("owner");
            props.setLoginToken(token);
            props.history.push("/");
            window.location.reload();
          } else {
            props.history.push("/login");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTeacherLogin = async () => {
    await axios
      .post(`${URL}/api/login-teacher`, {
        empId: teacherEmpId,
        password: teacherPassword,
      })
      .then((response) => {
        if (response.data === "invaliduser") {
          props.warningToast("Wrong Credentials !");
        } else if (response.data === "usernotfound") {
          props.ErrorToast("User doest not exist ! Contact Administrator !");
        } else {
          const { token } = response.data;
          if (token !== undefined && token !== "") {
            props.setRoleToken("teacher");
            props.setLoginToken(token);
            props.history.push("/");
            window.location.reload();
          } else {
            props.history.push("/login");
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const studentRole = (
    <div className="student">
      <div className="student__registerationId">
        <label htmlFor="registerationId">
          {" "}
          Registeration No :
          <input
            className="inputBox"
            type="text"
            id="registerationId"
            value={studentRegdNo}
            onChange={(event) => {
              setStudentRegdNo(event.target.value);
            }}
          />
        </label>
      </div>
      <div className="student__password">
        <label htmlFor="studentPassword">
          {" "}
          Password :
          <input
            className="inputBox"
            type="password"
            id="studentPassword"
            style={{
              marginLeft: "52px",
              marginTop: "10px",
              marginBottom: "30px",
            }}
            value={studentPassword}
            onChange={(event) => {
              setStudentPassword(event.target.value);
            }}
          />
        </label>
      </div>
      <Button className="loginButton" onClick={handleStudentLogin}>
        Login as Student
      </Button>
    </div>
  );
  const teacherRole = (
    <div className="teacher">
      <div className="teacher__employee">
        <label htmlFor="employeeId">
          {" "}
          Employee Id :
          <input
            className="inputBox"
            type="text"
            id="employeeId"
            value={teacherEmpId}
            onChange={(event) => {
              setTeacherEmpId(event.target.value);
            }}
          />
        </label>
      </div>
      <div className="teacher__password">
        <label htmlFor="teacherPassword">
          {" "}
          Password :
          <input
            className="inputBox"
            type="password"
            id="teacherPassword"
            style={{
              marginLeft: "22px",
              marginTop: "10px",
              marginBottom: "30px",
            }}
            value={teacherPassword}
            onChange={(event) => {
              setTeacherPassword(event.target.value);
            }}
          />
        </label>
      </div>
      <Button className="loginButton" onClick={handleTeacherLogin}>
        Login as Teacher
      </Button>
    </div>
  );
  const adminRole = (
    <div className="admin">
      <div className="admin__employee">
        <label htmlFor="emailId">
          {" "}
          Email :
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setAdminEmail(e.target.value);
            }}
            id="emailId"
            style={{ marginLeft: "30px" }}
            value={adminEmail}
          />
        </label>
      </div>
      <div className="admin__password">
        <label htmlFor="adminPassword">
          {" "}
          Password :
          <input
            className="inputBox"
            value={adminPassword}
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
            type="password"
            id="adminPassword"
            style={{
              marginTop: "10px",
              marginBottom: "30px",
            }}
          />
        </label>
      </div>
      <Button className="loginButton" onClick={handleAdminLogin}>
        Login as Admin
      </Button>
    </div>
  );

  const ownerRole = (
    <div className="owner">
      <div className="owner__employee">
        <label htmlFor="emailId">
          {" "}
          Email :
          <input
            className="inputBox"
            type="text"
            onChange={(e) => {
              setOwnerEmail(e.target.value);
            }}
            id="emailId"
            style={{ marginLeft: "30px" }}
            value={ownerEmail}
          />
        </label>
      </div>
      <div className="owner__password">
        <label htmlFor="ownerPassword">
          {" "}
          Password :
          <input
            className="inputBox"
            value={ownerPassword}
            onChange={(e) => {
              setOwnerPassword(e.target.value);
            }}
            type="password"
            id="ownerPassword"
            style={{
              marginTop: "10px",
              marginBottom: "30px",
            }}
          />
        </label>
      </div>
      <Button className="loginButton" onClick={handleOwnerLogin}>
        Login as Owner
      </Button>
    </div>
  );

  const handleButtonClick = (event) => {
    setRole(event.target.name);
    setFlag(false);
  };
  const handleBack = () => {
    setRole("");
    setFlag(true);
    setAdminEmail("");
    setAdminPassword("");
  };
  return (
    <div className="bodyDivLogin">
      <div className="roleSelector">
        <div className="smallBox">
          {role === "student" && <div>{studentRole}</div>}
          {role === "teacher" && <div>{teacherRole}</div>}
          {role === "admin" && <div>{adminRole}</div>}
          {role === "owner" && <div>{ownerRole}</div>}
          {!flag && (
            <Button variant="dark" className="backButton" onClick={handleBack}>
              Back
            </Button>
          )}
        </div>
      </div>
      {flag && (
        <div className="buttons">
          <span className="heading">Login as</span>
          <Button
            variant="secondary"
            className="role__button"
            name="student"
            onClick={handleButtonClick}
          >
            Student
          </Button>
          <Button
            variant="secondary"
            className="role__button"
            name="teacher"
            onClick={handleButtonClick}
          >
            Teacher
          </Button>
          <Button
            variant="secondary"
            className="role__button"
            name="admin"
            onClick={handleButtonClick}
          >
            Admin
          </Button>
          {/* <Button
            variant="secondary"
            className="role__button"
            name="owner"
            onClick={handleButtonClick}
          >
            Owner
          </Button> */}
          {/* <Link to="/Administrator/login">Login as Administrator</Link> */}
          {/* <Link to="/Administrator/Register">Register as Administrator</Link> */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

// export default LoginScreen;
export default connect(null, {
  successToast,
  warningToast,
  ErrorToast,
  setLoginToken,
  setRoleToken,
})(LoginScreen);
