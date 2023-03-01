import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const Bubble = ({ owner, comment_body }) => {
  return (
    <div
      style={{
        border: "1px dotted black",
      }}
      className=" my-2 text-align-left rounded-5 p-3 w-100 fs-6 d-inline-block "
    >
      <span className="fs-6 m-2">{owner && owner.toUpperCase()}</span>
      <br />
      <div
        style={{
          border: "1px dashed black",
          borderRadius: "25px",
        }}
        className="bg-white p-2 my-1"
      >
        {comment_body}
      </div>
    </div>
  );
};

export default Bubble;
