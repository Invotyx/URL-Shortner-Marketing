import React, { Component } from "react";
import Advertisement from "./Advertisement";
export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: {},
    };
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    fetch("/api/campaign/view/" + id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            item: result.data.campaign,
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
        <div class="row justify-content-around">
          <div className="col-md-6">
            <h4>Campaign</h4>
            <div class="card">
              <div class="card-header">
                <img
                  class="card-img-top"
                  src={item.meta_image}
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">{item.meta_title}</h5>
                <p class="card-text">{item.meta_description}</p>
                <a href={item.destination_url} class="btn btn-primary">
                  Go To Link
                </a>
              </div>
            </div>
          </div>
          {item.advertisement && <Advertisement id={item.advertisement.id} />}
        </div>
      );
    }
  }
}
