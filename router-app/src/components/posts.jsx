import React from "react";
import queryString from "query-string";

const Posts = ({ match, location }) => {
  const { sortBy } = queryString.parse(location.search); //returns obj w/ queryString extracted from <Router> location.search
  console.log(sortBy);

  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year}, Month: {match.params.month}
    </div>
  );
};

export default Posts;
