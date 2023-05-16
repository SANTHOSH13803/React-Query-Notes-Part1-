import axios from "axios";
import { useQuery } from "react-query";

// const fetchSuperHero = (HeroID) => {
//   return axios.get("http://localhost:4000/superheroes/" + HeroID);
// };
// const useSuperHeroData = (HeroID) => {
//   return useQuery(["super-hero", HeroID], () => fetchSuperHero(HeroID));
// };

// Another way
// In the above method we are passing heroId to the fetcher funtion
// RQ gives a bunch of parameters in Fetch funtion see below for understanding

const fetchSuperHero = ({ queryKey }) => {
  const HeroID = queryKey[1];
  // we are writing the index 1 beacuse queryKey mimics the uniqueKey
  // Here uniqueKey is the array so we used it.
  return axios.get("http://localhost:4000/superheroes/" + HeroID);
};
const useSuperHeroData = (HeroID) => {
  // Below we can pass 'n' number of arguments in the array if we have 'n' parameters.(The ulitmate goal is , It should be unique.)

  return useQuery(["super-hero", HeroID], fetchSuperHero);
};

export default useSuperHeroData;
