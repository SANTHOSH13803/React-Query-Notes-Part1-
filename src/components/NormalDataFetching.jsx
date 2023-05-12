import axios from "axios";
import React, { useEffect, useState } from "react";

const NormalDataFetching = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/superheroes");
        setData(response.data);
        setLoading(false);
        setError("");
      } catch (error) {
        setData([]);
        setLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-5">
      {loading ? (
        <div className=" p-4 text-center text-success">Loading....</div>
      ) : (
        <>
          <h2>Super Heros Page (Traditional)</h2>
          <ol className="mt-4">
            {data.map((each, index) => (
              <li key={index} className="fs-3">
                {each.name}
              </li>
            ))}
          </ol>
          <p className="text-danger">{error}</p>
        </>
      )}
    </div>
  );
};

export default NormalDataFetching;
