import React from "react";

export default function Price() {
  return (
    <section id="price" className="pricing-area section-big">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2>Choose Your Pricing Plan</h2>
              <p>
                We are and will always be free for all the causes you support.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="price-item" data-connectors="1">
              <div className="info">
                <h3>Cause</h3>
                <p className="price">Free</p>
              </div>
              <div className="features">
                <p>For Individual Uses</p>
                <ul>
                  <li>1 Message/Ad</li>
                  <li>Unlimited links</li>
                  <li>Analytics</li>
                </ul>
              </div>
              <a className="btn" href="#">
                iOS Download
              </a>
              <br />
              <a className="btn" href="#">
                Android Download
              </a>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="price-item featured" data-connectors="1">
              <div className="info">
                <h3>Business</h3>
                <p className="price">$3.97</p>
              </div>
              <div className="features">
                <p>For Startups/Businesses</p>
                <ul>
                  <li>3 Messages/Ads </li>
                  <li>Unlimited links</li>
                  <li>No watermark</li>
                  <li>Basic Support</li>
                </ul>
              </div>
              <a className="btn" href="#">
                iOS Download
              </a>
              <br />
              <a className="btn" href="#">
                Android Download
              </a>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="price-item" data-connectors="1">
              <div className="info">
                <h3>Agency/Enterprise</h3>
                <p className="price">$7.97</p>
              </div>
              <div className="features">
                <p>For Large Organizations</p>
                <ul>
                  <li>10 Messages/Ads</li>
                  <li>Unlimited links</li>
                  <li>No watermark</li>
                  <li>Analytics</li>
                  <li>Dedicated Support</li>
                </ul>
              </div>
              <a className="btn" href="#">
                iOS Download
              </a>
              <br />
              <a className="btn" href="#">
                Android Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
