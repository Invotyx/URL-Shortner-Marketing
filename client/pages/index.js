import { useEffect, useState } from "react";
import Head from "next/head";
import { API_ADDR } from "../config/constans";

export default function Home() {
  // error, isLoaded, items

  return (
    <>
      <Head>
        <title>Shurly - Promote What You Support</title>

        <meta charset="utf-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Shurly App - Promote What You Support"
        />
        <meta name="keywords" content="url shortener, shurly, iOS, android" />
        <meta name="author" content="Abid Siddiqi"></meta>

        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="assets/img/favicon.png"
        ></link>
        <link href="assets/css/plugin.css" rel="stylesheet"></link>
        <link href="assets/css/style.css" rel="stylesheet"></link>
        <link href="assets/css/responsive.css" rel="stylesheet"></link>
      </Head>
      <body>
        <div id="preloader"></div>
        <div className="menu-area navbar-fixed-top">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mainmenu">
                  <div className="navbar navbar-nobg">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="index.html">
                        <h2 className="slider-text" color="white">
                          Add Shurly Logo Here
                        </h2>
                      </a>
                      <button
                        type="button"
                        className="navbar-toggle"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                    </div>

                    <div className="navbar-collapse collapse">
                      <nav>
                        <ul className="nav navbar-nav navbar-right">
                          <li>
                            <a className="smooth_scroll" href="#slider">
                              HOME
                            </a>
                          </li>
                          <li>
                            <a className="smooth_scroll" href="#feature">
                              FEATURES
                            </a>
                          </li>
                          <li>
                            <a className="smooth_scroll" href="#price">
                              PRICING
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="slider" className="slider-area"></section>
      </body>
    </>
  );
}
