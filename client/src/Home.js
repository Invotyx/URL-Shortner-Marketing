import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentWillMount() {
    fetch("/api/campaign/view/get-all")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            isLoaded: true,
            items: result.data.campaigns,
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="row justify-content-around">
          <div class="col--md-4">
            <h4>Campaigns List</h4>
            <ul class="list-group">
              {items.map((item) => (
                <li class="list-group-item" key={item.interal_url}>
                  <Link to={`${item.internal_url}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}
