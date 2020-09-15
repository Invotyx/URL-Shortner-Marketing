import React from "react";

export default function Footer() {
  return (
    <section id="action" className="action-area section-big">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-5 col-sm-5">
            <div className="action-img">
              <img src="assets/img/cta/cta.png" alt="" />
            </div>
          </div>

          <div className="col-lg-6 col-md-7 col-sm-7">
            <div className="content-box">
              <h2>
                Download for FREE <br /> for iOS or Android
              </h2>
              <p>
                People click on links they find interesting and now you can
                display your message right before they read that article.
                Revolutionize the way you promote your cause or business on
                social media using Shurly and skyrocket your reach.
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
        </div>
      </div>
    </section>
  );
}
