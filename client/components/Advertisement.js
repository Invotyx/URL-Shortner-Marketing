import React, { Component } from "react";
import { API_ADDR } from "../config/constans";
import { ADDR } from "../config/constans";
import { APP_NAME } from "../config/constans";
import { REDIRECT } from "../config/constans";
import { REDIRECT_TIME } from "../config/constans";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: props.advertisement,
      plan: props.advertisement.subscription.plan,
    };
  }
  componentWillMount() {
    if (REDIRECT) {
      setTimeout(() => {
        window.location = this.props.destination_url;
      }, REDIRECT_TIME);
    }
  }
  render() {
    const { item, plan } = this.state;

    return (
      <div className="container">
        <div className="center">
          <div
            className="card row"
            style={{
              width: "100%",
            }}
          >
            {item.display == "image" && (
              <a
                href={item.link}
                target="blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  className="card-img-top"
                  src={`${item.attachment}`}
                  height="350px"
                  alt="Card image cap"
                />
              </a>
            )}
            {item.display == "title" && (
              <a
                href={item.link}
                target="blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card-body">
                  <h3 className="card-title text-center">{item.title}</h3>
                </div>
              </a>
            )}

            {item.display == "both" && (
              <div className="card-body">
                <a
                  href={item.link}
                  target="blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h3 className="card-title text-center">{item.title}</h3>
                  <img
                    className="card-img-top"
                    src={`${item.attachment}`}
                    height="350px"
                    alt="Card image cap"
                  />
                </a>
              </div>
            )}
            {plan.title == "Cause" && (
              <a
                href={ADDR}
                target="blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="card-footer text-right">
                  Powered By {APP_NAME}
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}
