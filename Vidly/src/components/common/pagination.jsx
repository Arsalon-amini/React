import React, { Component } from "react";
import _ from "lodash"; //optimized version of underscore

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props; //part of props (from movies)

  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize); //rounds to greatest int
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1); //util fn to generate (return) array with numbers (start, end)

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {" "}
              {page}{" "}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
