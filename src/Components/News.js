import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);
  const [totalResults, settotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
    
  

  const updateNews =async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5c3c9b4ef55344cab4ac2c95f9952edf&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  }
   useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();
    // eslint-disable-next-line
   }, []);

  

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5c3c9b4ef55344cab4ac2c95f9952edf&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" , marginTop:"90px"}}>
          News Top Headlines From {capitalizeFirstLetter(props.category)}
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles && articles.length > 0
                ? articles.map((element) => {
                    return (
                      <div className="col-md-4" key={element.url}>
                        <NewsItems
                          title={element.title ? element.title.slice(0, 45) : ""}
                          description={element.description ? element.description.slice(0, 88) : ""}
                          imageUrl={element.urlToImage}
                          newsUrl={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}
                        />
                      </div>
                    );
                  })
                : !loading && <p>No news articles found.</p>}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
  }


News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
