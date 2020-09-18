import React, { Component } from "react";
import { ADDR } from "../config/constans";
import { APP_NAME } from "../config/constans";
import { REDIRECT_TIME } from "../config/constans";
import { REDIRECT } from "../config/constans";

export default class NoAdvertisement extends Component {
  constructor(props) {
    super(props);
    if (REDIRECT) {
      setTimeout(() => {
        window.location = this.props.destination_url;
      }, REDIRECT_TIME);
    }
  }

  render() {
    return (
      <div className="">
        <div className="card" style={{ width: "50rem" }}>
          <a
            href={ADDR}
            target="blank"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="card-footer text-right">Powered By {APP_NAME}</div>
          </a>
        </div>
      </div>
    );
  }
}
