import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import LoginScreen from "./component/Authentication/LoginScreen";
import ProtectedRoute from "./component/Authentication/Protected";
import OwnerHome from "./component/Owner/Home";
import AdminHome from "./component/Admin/Home";
import TeacherHome from "./component/Teacher/Home";
import adminSubjects from "./component/Admin/ManageSubject";
import Subjects from "./component/Teacher/ManageSubjects";
import StudentHome from "./component/Student/Home";
import TeacherUpdate from "./component/Teacher/TeacherCreation";
import Dept_and_position from "./component/Admin/Department and Position Module/DepartmentAndPosition";
import Home from "./component/Layout/Home";
import NoticeBoard from "./component/Layout/NoticeBoard";
import CreateNotice from "./component/Admin/Notice Module/CreateNotice";
import ManageAssignments from "./component/Student/ManageAssignments";
import AssignmentUpload from "./component/Teacher/ManageUploadedAssignment";
import AttendanceMaster from "./component/Teacher/AttendanceMaster";
import IndividualAttendance from "./component/Teacher/IndividualAttendance";

const Routes = () => {
  const cookies = new Cookies();
  const role = cookies.get("rid");
  return (
    <Router>
      <Switch>
        {role === "undefined" && <Route path="/" exact component={Home} />}
        {role === undefined && <Route path="/" exact component={Home} />}
        {role === "admin" && (
          <ProtectedRoute path="/" exact component={AdminHome} />
        )}
        {role === "owner" && (
          <ProtectedRoute path="/" exact component={OwnerHome} />
        )}
        {role === "teacher" && (
          <ProtectedRoute path="/" exact component={TeacherHome} />
        )}
        {role === "student" && (
          <ProtectedRoute path="/" exact component={StudentHome} />
        )}
        {role === "admin" && (
          <ProtectedRoute
            path="/create-notice"
            exact
            component={CreateNotice}
          />
        )}
        {role === "admin" && (
          <ProtectedRoute path="/teacher" exact component={TeacherUpdate} />
        )}
        {role === "admin" && (
          <ProtectedRoute
            path="/department-position"
            exact
            component={Dept_and_position}
          />
        )}
        {role === "teacher" && (
          <ProtectedRoute path="/Subject" exact component={Subjects} />
        )}
        {role === "admin" && (
          <ProtectedRoute
            path="/manage-subject"
            exact
            component={adminSubjects}
          />
        )}
        {role === "student" && (
          <ProtectedRoute
            path="/assignments"
            exact
            component={ManageAssignments}
          />
        )}
        {role === "teacher" && (
          <ProtectedRoute
            path="/assignment-masters"
            exact
            component={AssignmentUpload}
          />
        )}
        {role === "teacher" && (
          <ProtectedRoute
            path="/attendance"
            exact
            component={AttendanceMaster}
          />
        )}
        {role === "teacher" && (
          <ProtectedRoute
            path="/attendance/:id"
            exact
            component={IndividualAttendance}
          />
        )}

        <Route path="/login" exact component={LoginScreen} />
        <Route path="/notices" exact component={NoticeBoard} />
        <Route
          path="*"
          component={() => {
            return "404 Not Found!!";
          }}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
