import React, { Component } from "react";

export default class Advertisement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {},
    };
  }
  componentWillMount() {
    fetch("/api/advertisement/view/" + this.props.id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            item: result.data.advertisement,
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
  }
  render() {
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="col-md-4">
          <h4>Advertisement</h4>
          <a href={item.link}>
            <div class="card" style={{ width: "18rem" }}>
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
                  <p class="card-text">{item.description}</p>
                </div>
              )}

              {item.display == "both" && (
                <div class="card-body">
                  <img
                    class="card-img-top"
                    src={`/${item.attachment}`}
                    alt="Card image cap"
                  />
                  <h5 class="card-title">{item.title}</h5>
                  <p class="card-text">{item.description}</p>
                </div>
              )}
            </div>
          </a>
        </div>
      );
    }
  }
}
