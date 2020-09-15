import React from "react";

export default function Slider() {
  return (
    <section id="slider" className="slider-area">
      <div className="container">
        <div className="row d-flex">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="slider-text clearfix">
              <h1>
                Promote What <br /> You Support.
              </h1>
              <p>
                Shorten your links with Shurly and display your message before
                showing the content of the link. Now you can promote the cause
                you support, business you just started or a funny gif without
                writing any content. Just find interesting content from the web
                and start sharing it with your audience using Shurly while
                promoting what you support. Download and start using for free!
              </p>
              <div className="btn-set">
                <a href="" className="btn btn-black">
                  <i className="fa fa-android"></i>
                  <div className="btn-text">
                    <h3>Download</h3>
                    <p>it from Playstore</p>
                  </div>
                </a>
                <a href="" className="btn btn-white">
                  <i className="fa fa-apple"></i>
                  <div className="btn-text">
                    <h3>Download</h3>
                    <p>it from Appstore</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 col-xs-12 slider-img">
            <img src="assets/img/slider/1.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
