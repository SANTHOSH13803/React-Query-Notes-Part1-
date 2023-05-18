import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
//** To access this page follow the below url */
//http://localhost:3000/paginated-queries

const fetchColors = (page) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}}`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);
  const {
    data: colorsData,
    isLoading,
    error,
    isFetching,
    isError,
  } = useQuery(["colors", page], () => fetchColors(page), {
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="p-5">
        <h1>Loading.....</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="p-5">
        <h1 className="text-danger"> {error.message}</h1>
      </div>
    );
  }
  return (
    <div className="p-5">
      <h1>Paginated Queries</h1>
      <ul className="p-3">
        {colorsData?.data?.map((color) => (
          <li key={color.id} style={{ backgroundColor: `${color.name}` }}>
            <h5 className="text-white">{color.id}</h5>
            {color.name === "White" ? (
              <h3>{color.name}</h3>
            ) : (
              <h3 className="text-white">{color.name}</h3>
            )}
          </li>
        ))}
      </ul>
      <div className="d-flex gap-2">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          className={`btn btn-primary ${page === 1 && "btn-secondary"}`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className={`btn btn-primary ${page === 4 && "btn-secondary"}`}
          disabled={page === 4}
        >
          Next
        </button>
      </div>

      {isFetching && <p className="text-success">Fetching...</p>}
    </div>
  );
};

export default PaginatedQueries;
