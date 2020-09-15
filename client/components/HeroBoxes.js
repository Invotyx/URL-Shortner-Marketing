import React from "react";

export default function HeroBoxes() {
  return (
    <section className="hero-box-area section-big">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="hero-box">
              <span className="lnr lnr-magnifier"></span>
              <h3>1) Find</h3>
              <p>
                Look for interesting content from the internet that your
                audience would love.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="hero-box">
              <span className="lnr lnr-pointer-up"></span>
              <h3>2) Choose</h3>
              <p>
                Select the message you want to display before showing the
                content of the link.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="hero-box">
              <span className="lnr lnr-link"></span>
              <h3>3) Share</h3>
              <p>
                Share the shortened link on social media as posts or 'swipe up'
                stories.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
