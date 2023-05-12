import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const RQDataFetching = () => {
  const result = useQuery(
    "super-heros",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      // refetchOnWindowFocus: true,
      // refetchInterval: 2000,
      // refetchIntervalInBackground : 2000,
      enabled: false, // This enables data mounting when page loads.
    }
  );

  // useQuery Hook accepts two arguments
  // 1) Unique Key
  // 2) funtion that return a promise.

  // console.log(result);
  // useQuery contains all the query parameters

  // In this example we are only using limited ones
  // We use object destrcuturing

  const { isLoading, data, error, isError, isFetching, refetch } = result;

  // above are all the parameters is useQuery hook console.log it to understand
  console.log({ isLoading, isFetching });
  if (isLoading) {
    return <h2 className="text-danger text-center">Loading.....</h2>;
  }

  return (
    <div>
      <h2>React Query Data Fetching</h2>
      <button onClick={refetch}>Fetch Heros</button>
      <ol>
        {data?.data.map((each) => {
          return (
            <li key={each.name}>
              <h3 className="text-primary">{each.name}</h3>
            </li>
          );
        })}
      </ol>
      {isError && <p className="text-danger">{error.message}</p>}
    </div>
  );
};

export default RQDataFetching;

// By using useQuery we can reduce the code for async operations
// Indeed it provides the loading ,error parameters init, so there is no use of using use state and useEffect
