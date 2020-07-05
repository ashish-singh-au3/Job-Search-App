import React, { Component } from "react";

import axios from "axios";
import { cloneDeep, isEmpty, orderBy, filter } from "lodash";
//import "./App.css";

import Pagination from "react-js-pagination";
import Form from "react-bootstrap/Form";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      filteredSet: [],
      currentPage: 1,
      PerPage: 10,
      sort_by: "location",
      sort_order: "asc",
      experience: "",
      skill: "",
      location: "",
      title: "",
      company: "",
      expired: false,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onChange = (event) => {
    let inputName = event.target.name;
    let value = event.target.value;
    this.setState({ [inputName]: value });
    event.preventDefault();
  };

  handleCheck = (event) => {
    this.setState({ expired: event.target.checked }, () => {
      this.applyFilter();
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: Number(page),
    });
  };

  fetchData = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://nut-case.s3.amazonaws.com/jobs.json`
      )
      .then((res) => {
        const jobs = res.data.data;
        this.setState(
          {
            jobs,
          },
          () => {
            this.applyFilter();
          }
        );
      });
  };

  handleSort = (key) => {
    const sortConf = {
      asc: "desc",
      desc: "asc",
    };
    this.setState((prevState) => {
      let cstate = Object.assign({}, prevState);
      return {
        sort_by: key,
        sort_order: sortConf[cstate.sort_order],
      };
    });
    this.applyFilter();
  };

  applyFilter = () => {
    const {
      jobs,
      sort_by,
      sort_order,
      experience,
      location,
      skill,
      title,
      company,
      expired,
    } = this.state;

    let filteredSet = cloneDeep(jobs);
    if (expired) {
      filteredSet = filter(filteredSet, function (obj) {
        return new Date() < new Date(obj.enddate);
      });
    }
    filteredSet = orderBy(filteredSet, [sort_by], [sort_order]);
    if (experience) {
      filteredSet = filter(filteredSet, function (obj) {
        return (
          obj.experience.toLowerCase().indexOf(experience.toLowerCase()) !== -1
        );
      });
    }
    if (location) {
      filteredSet = filter(filteredSet, function (obj) {
        return (
          obj.location.toLowerCase().indexOf(location.toLowerCase()) !== -1
        );
      });
    }
    if (skill) {
      filteredSet = filter(filteredSet, function (obj) {
        return obj.skills.toLowerCase().indexOf(skill.toLowerCase()) !== -1;
      });
    }
    if (title) {
      filteredSet = filter(filteredSet, function (obj) {
        return obj.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
      });
    }
    if (company) {
      filteredSet = filter(filteredSet, function (obj) {
        return (
          obj.companyname.toLowerCase().indexOf(company.toLowerCase()) !== -1
        );
      });
    }
    this.setState({ filteredSet, currentPage: 1 });
  };

  render() {
    const { jobs, currentPage, PerPage, filteredSet } = this.state;
    const indexOfLastJob = currentPage * PerPage;
    const indexOfFirstJob = indexOfLastJob - PerPage;
    const currentJobs = filteredSet.slice(indexOfFirstJob, indexOfLastJob);
    const renderJobs = currentJobs.map((job) => {
      return (
        <div className="p-6 border-bottom border-default" key={job._id}>
          <h4 className="">
            {job.title} {job.experience && <span>- Exp: {job.experience}</span>}{" "}
            <a href={job.applylink} className="text-default">
              Apply Now
            </a>
          </h4>
          <div className="my-2">
            <a className="" style={{ color: "#365FA8" }} href="!#">
              {job.companyname}
            </a>{" "}
            <small className="text-default">{job.location}</small>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <span style={{ color: "#479A4B" }}>{job.type}</span>
            </div>
            <div>
              {job.enddate && (
                <small className="text-default">
                  Expires: {new Date(job.enddate).toDateString()}
                </small>
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div id="app">
          <header className="bg-dark py-4 md:pb-16">
            <div className="col-md-12 mx-auto px-6">
              <div>
                <h1 className="text-white">
                  <center> Search your dream job...</center>
                </h1>
              </div>
              <div className="form-row">
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder=" Job Title"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Organisation"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    name="experience"
                    className="form-control"
                    placeholder="Experience"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Location"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    name="skill"
                    className="form-control"
                    placeholder="Skills"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-md-3">
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={this.applyFilter}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="mx-auto py-6 col-20">
            <div className="col-md-6">
              <h2 className="mb-2 mx-6">
                Recommended Jobs: {filteredSet.length}
              </h2>

              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Filter expired"
                  checked={this.state.expired}
                  onClick={this.handleCheck}
                />
              </Form.Group>
              {renderJobs}
            </div>
            {!isEmpty(filteredSet) && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={PerPage}
                totalItemsCount={filteredSet.length}
                prevPageText="PREV"
                nextPageText="NEXT"
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass=""
                firstPageText="FIRST"
                lastPageText="LAST"
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
