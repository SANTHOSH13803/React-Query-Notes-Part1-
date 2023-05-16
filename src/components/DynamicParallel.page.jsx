import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

// to access this page
// http://localhost:3000/dynamic-parallel-queries

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallelpage = ({ heroIDs }) => {
  // heroIDs is a prop passed in app.js
  const dynamicParallelQueriesResult = useQueries(
    heroIDs.map((eachid) => {
      return {
        queryKey: ["super-hero", eachid],
        queryFn: () => fetchSuperHero(eachid),
      };
    })
  );
  const heroData = dynamicParallelQueriesResult[0];
  const hero2Data = dynamicParallelQueriesResult[1];
  //   console.log(dynamicParallelQueriesResult);
  //   console.log(heroData.data.data);
  return (
    <div>
      <h1>Hero {heroData?.data?.data.id} Data</h1>
      <ol>
        <li key={heroData?.data?.data.id}>
          <h2>{heroData?.data?.data.name}</h2>
        </li>
      </ol>
      <h1>Hero {hero2Data?.data?.data.id} Data</h1>
      <ol>
        <li key={hero2Data?.data?.data.id}>
          <h2>{hero2Data?.data?.data.name}</h2>
        </li>
      </ol>
    </div>
  );
};

export default DynamicParallelpage;
