import React, { Component } from "react";
import { API_ADDR } from "../config/constans";
import { APP_NAME } from "../config/constans";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {},
      plan: {},
    };
  }
  componentWillMount() {
    if (this.props.advertisement == null) {
      this.setState({
        isLoaded: false,
        error: null,
        item: {},
        plan: {},
      });
    }
    fetch(`${API_ADDR}/advertisement/get-ad-content/` + this.props.id)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            this.setState({
              isLoaded: true,
              item: result.data.advertisement,
              plan: result.data.subscription.plan,
            });
          } else {
            this.setState({
              error: result,
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    setTimeout(() => {
      window.location = this.props.destination_url;
    }, 5000);
  }
  render() {
    const { error, isLoaded, item, plan } = this.state;
    if (error) {
      return <Error error={error.message}></Error>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="">
          <a
            href={item.link}
            target="blank"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="card" style={{ width: "50rem" }}>
              {item.display == "image" && (
                <img
                  className="card-img-top"
                  src={`/${item.attachment}`}
                  alt="Card image cap"
                />
              )}
              {item.display == "title" && (
                <div className="card-body">
                  <h5 className="card-title text-center">{item.title}</h5>
                </div>
              )}

              {item.display == "both" && (
                <div className="card-body">
                  <h5 className="card-title text-center">{item.title}</h5>
                  <img
                    className="card-img-top"
                    src={`/${item.attachment}`}
                    alt="Card image cap"
                  />
                </div>
              )}
              {plan.title == "Cause" && (
                <div className="card-footer text-right">
                  Powered By {APP_NAME}
                </div>
              )}
            </div>
          </a>
        </div>
      );
    }
  }
}
