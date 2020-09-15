import React, { Component } from "react";
import { API_ADDR } from "../config/constans";

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
    fetch(`${API_ADDR}/advertisement/view/` + this.props.id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            item: result.data.advertisement,
            plan: result.data.subscription.plan,
          });
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
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="">
          {/* <a href={item.link}> */}
          <div class="card" style={{ width: "50rem" }}>
            {item.display == "image" && (
              <img
                class="card-img-top"
                src={`/${item.attachment}`}
                alt="Card image cap"
              />
            )}
            {item.display == "title" && (
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                {/* <p class="card-text">{item.description}</p> */}
              </div>
            )}

            {item.display == "both" && (
              <div class="card-body">
                <h5 class="card-title">{item.title}</h5>
                <img
                  class="card-img-top"
                  src={`/${item.attachment}`}
                  alt="Card image cap"
                />
                {/* <p class="card-text">{item.description}</p> */}
              </div>
            )}
            {plan.title == "Cause" && (
              <div class="card-footer text-right">Powered By Sharely</div>
            )}
          </div>
          {/* </a> */}
        </div>
      );
    }
  }
}
