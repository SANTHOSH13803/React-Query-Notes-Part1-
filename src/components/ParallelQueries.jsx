import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueries = () => {
  const { data: herosData } = useQuery("superHeros", fetchSuperHeros);
  const { data: friendsData } = useQuery("friends", fetchFriends);
  // To use data of multiple queries to avoid same names we are using alias here
  // herosData, friendsData can be used for the data

  return (
    <div className="p-3">
      <h1>Heros Data</h1>
      <ol>
        {herosData?.data.map((each) => (
          <li key={each.id}>{each.name}</li>
        ))}
      </ol>
      <h1>Friends Data</h1>
      <ol>
        {friendsData?.data.map((each) => (
          <li key={each.id}>{each.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default ParallelQueries;
