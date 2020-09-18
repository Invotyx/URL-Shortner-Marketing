import React from "react";
import { ADDR } from "../config/constans";
import { APP_NAME } from "../config/constans";

export default function AdFooter(props) {
  return (
    <footer
      class="footer"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "60px",
        lineHeight: "60px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div class="">
        <span class="text-muted">
          <a
            href={ADDR}
            target="blank"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="card-footer text-right">{APP_NAME}</div>
          </a>
        </span>
      </div>
    </footer>
  );
}
