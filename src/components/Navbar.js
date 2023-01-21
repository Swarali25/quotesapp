import React, { useState } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const [text, setText] = useState("");
  const [results, setResults] = useState(false);
  const [searchedResults, setsearchedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuotes = async () => {
    setResults(true);
    const url = `https://api.quotable.io/quotes?tags=${text.toLocaleLowerCase()}&page=${1}`;
    props.setProgress(20);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setsearchedResults(parsedData.results);
    setLoading(false);
    props.setProgress(100);
  };
  const onChange = (event) => {
    setText(event.target.value);
  };
  const closeResults = () => {
    setResults(false);
    setText("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/quotesapp">
            Quotes App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="form-check form-switch text-light">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.toggleMode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Enable DarkMode
              </label>
            </div>
            <div className="d-flex col-md-5 mx-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Enter tags to search quotes like sports,history "
                aria-label="Search"
                value={text}
                onChange={onChange}
              />
              <button
                className="btn btn-outline-success"
                onClick={searchQuotes}
                disabled={text <= 0}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
      {(results === true ? true : false) && (
        <div
          className="container"
          style={{
            backgroundColor: "rgb(60 95 183)",
            marginTop: "56px",
          }}
        >
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={closeResults}
          ></button>
          <h2
            className="text-center"
            style={{
              margin: "25px",
              color: props.mode === "dark" ? "white" : "black",
            }}
          >
            Searching Results for tag {text}
          </h2>
          <h3 className="text-center">
            {text.length >= 3 &&
              (searchedResults.length === 0 ? "No results found" : "")}
          </h3>
          {loading === true ? true : false && <Spinner />}
          <div className="container">
            <div className="row">
              <table className="table table-success table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Quote</th>
                    <th scope="col">Author</th>
                  </tr>
                </thead>

                <tbody>
                  {searchedResults.map((element) => {
                    return (
                      <tr key={element._id}>
                        <td>
                          {element.content
                            ? element.content
                            : "No Results Found"}
                        </td>
                        <td>
                          <cite
                            title="Source Title"
                            className="blockquote-footer"
                          >
                            {element.author ? element.author : "unknown"}
                          </cite>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Navbar.propTypes = {
  limit: PropTypes.number,
  minLength: PropTypes.number,
  mode: PropTypes.string,
};

Navbar.defaultProps = {
  limit: 10,
  minLength: 60,
  mode: "light",
};
export default Navbar;
