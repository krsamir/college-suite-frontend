import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NoticeBoard.css";
const NoticeBoard = () => {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    axios
      .get("/api/get_notice")
      .then((res) => setNotice(res.data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
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

export default NoticeBoard;
