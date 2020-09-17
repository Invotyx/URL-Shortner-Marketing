import React from "react";

export default function Error(props) {
  return (
    <div className="alert">
      <link href="assets/css/error.css" rel="stylesheet"></link>
      {props.error}
    </div>
  );
}
