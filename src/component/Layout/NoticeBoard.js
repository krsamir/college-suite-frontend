import React, { useEffect } from "react";
import "./NoticeBoard.css";
import { adminUtils } from "../../Redux/Actions/AdminAction";
import { connect } from "react-redux";
const NoticeBoard = (props) => {
  const { adminUtils, notice } = props;
  useEffect(() => {
    adminUtils();
  }, [adminUtils]);
  return (
    <div>
      <div className="corners">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ textAlign: "center", fontWeight: "bolder" }}>Notices</p>
          {notice.length !== 0 &&
            notice.map((value) => (
              <div key={value.id}>
                <p
                  style={{ textAlign: "center", fontWeight: "bold" }}
                  className="titleTag"
                >
                  {value.Title}
                </p>
                <p className="bodyTag">{value.body}</p>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notice: state.admin.data,
});

export default connect(mapStateToProps, { adminUtils })(NoticeBoard);
