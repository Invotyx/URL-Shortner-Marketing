import React, { Component } from "react";
import { API_ADDR } from "../config/constans";
import { APP_NAME } from "../config/constans";

export default class NoAdvertisement extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      window.location = props.destination_url;
    }, 5000);
  }

  render() {
    return (
      <div className="">
        <div className="card" style={{ width: "50rem" }}>
          <div className="card-body text-right">Powered By {APP_NAME}</div>
        </div>
      </div>
    );
  }
}
