import React from "react";

const QuotesItem = (props) => {
    let { quote, author, tags } = props;
    return (
      <div className="card my-3">
        <div
          className="card-body"
          style={{
            backgroundColor: props.mode === "light" ? "grey" : "white",
          }}
        >
          <blockquote className="blockquote mb-0">
            <p>{quote}</p>
            <footer
              className="blockquote-footer"
              style={{ color: props.mode === "light" ? "white" : "" }}
            >
              <cite title="Source Title">{author}</cite>
            </footer>
          </blockquote>
        </div>
        <div className="card-footer">{tags.join(" ")}</div>
      </div>
    ); 
}

export default QuotesItem;
