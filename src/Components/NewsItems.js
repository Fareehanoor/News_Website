import React from "react";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } =props;
  return (
    <div class="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span class="badge rounded-pill bg-danger">{source}</span>
        </div>

        <img
          src={
            !imageUrl
              ? "https://images8.alphacoders.com/829/thumbbig-829025.webp"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small class="text-body-secondary">
              By Author {!author ? "Unkown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
