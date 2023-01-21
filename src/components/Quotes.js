import React, { useState, useEffect } from "react";
import QuotesItem from "./QuotesItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const Quotes = (props) => {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    updateQuotes();
  }, []);

  const updateQuotes = async () => {
    const url = `https://api.quotable.io/quotes?minLength=${props.minLength}&limit=${props.limit}&page=${page}`;
    props.setProgress(20);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setQuotesData(parsedData.results);
    setTotalResults(parsedData.totalCount);
    setLoading(false);
    props.setProgress(100);
  };
  const fetchMoreData = async() => {
    const url = `https://api.quotable.io/quotes?minLength=${
      props.minLength
    }&limit=${props.limit}&page=${page + 1}`;
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setQuotesData(quotesData.concat(parsedData.results));
    setTotalResults(parsedData.totalCount);
    setPage(page+1)
    props.setProgress(100);
  };

  return (
    <>
      <h2
        className="text-center"
        style={{
          margin: "25px",
          marginTop: "60px",
          color: props.mode === "dark" ? "white" : "black",
        }}
      >
        Most Popular Quotes 
      </h2>
      {loading === true ? true : false && <Spinner />}
      <InfiniteScroll
        dataLength={quotesData.length}
        next={fetchMoreData}
        hasMore={totalResults !== quotesData.length}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {quotesData.map((element) => {
              return (
                <div className="col-md-4" key={element._id}>
                  <QuotesItem
                    quote={element.content}
                    author={element.author ? element.author : "unknown"}
                    tags={element.tags}
                    mode={props.mode}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Quotes;

Quotes.propTypes = {
  limit: PropTypes.number,
  minLength: PropTypes.number,
  mode: PropTypes.string,
};

Quotes.defaultProps = {
  limit: 10,
  minLength: 60,
  mode: "light",
};
