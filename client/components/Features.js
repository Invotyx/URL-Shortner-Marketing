import React from "react";

export default function Features() {
  return (
    <div>
      <section id="feature" className="feature-area grey section-big">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="feture-img">
                <img src="assets/img/feature/ft-1.png" alt="" />
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
              <div className="feature-content-one">
                <h2>
                  Display Images <br /> Text or even GIFs
                </h2>
                <p>
                  Your message (Ads) can show a poster of the cause you are
                  supporting or flier of your business with text/gifs to make
                  your Ads more interesting. Trying is believing!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="feature-area section-big">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="feature-content-two">
                <h2>
                  Analytics Help <br /> In Measuring Your Success
                </h2>
                <p>
                  Your 'Shurly links' will give valuable insights including the
                  number of clicks and location of your audience. Reach more
                  people while measuring the success of your links with Shurly.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-sm-6">
              <div className="feture-img">
                <img src="assets/img/feature/ft-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
