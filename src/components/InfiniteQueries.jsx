import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
// http://localhost:3000/infinite-queries

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
  //   name should be pageParam
  //   ❌ pageParams
};

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastpage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading) {
    return (
      <div className="p-5">
        <h1 className="text-danger">Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-5">
        <p className="text-danger">{error.message}</p>
      </div>
    );
  }
  return (
    <div className="p-5">
      <h1>InfiniteQueries</h1>
      <ul>
        {data.pages.map((group, index) => (
          <Fragment key={index}>
            {group.data.map((color) => (
              <li className="d-flex gap-3" key={color.id}>
                <h3>{color.id}</h3>
                <h2>{color.name}</h2>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div className="shadow p-3 rounded-2">
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
        {isFetching && !isFetchingNextPage ? <h1>Fetching....</h1> : null}
      </div>
    </div>
  );
};

export default InfiniteQueries;
