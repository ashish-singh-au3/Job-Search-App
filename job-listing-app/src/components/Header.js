import React, { Component } from "react";

import "./Header.css";
export default class Header extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="home.js">
            Job Search App
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a className="nav-item nav-link active" href="home">
                For Employees <span class="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link active" href="home">
                For Applicants <span class="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link active" href="home">
                Support <span class="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link active" href="home">
                Sign-in<span class="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link active" href="home">
                Submit Jobs <span class="sr-only">(current)</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
