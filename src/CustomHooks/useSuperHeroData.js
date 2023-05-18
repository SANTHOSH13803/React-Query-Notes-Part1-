import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

// const fetchSuperHero = (HeroID) => {
//   return axios.get("http://localhost:4000/superheroes/" + HeroID);
// };
// const useSuperHeroData = (HeroID) => {
//   return useQuery(["super-hero", HeroID], () => fetchSuperHero(HeroID));
// };

// Another way
// In the above method we are passing heroId to the fetcher funtion
// RQ gives a bunch of parameters in Fetch funtion see below for understanding

//?  useQueryClient helps us to access the previous cache data of the other component

const fetchSuperHero = ({ queryKey }) => {
  const HeroID = queryKey[1];
  // we are writing the index 1 beacuse queryKey mimics the uniqueKey
  // Here uniqueKey is the array so we used it.
  return axios.get("http://localhost:4000/superheroes/" + HeroID);
};
const useSuperHeroData = (HeroID) => {
  const queryClient = useQueryClient();
  // Below we can pass 'n' number of arguments in the array if we have 'n' parameters.(The ulitmate goal is , It should be unique.)
  // getQueryData helps us to find the cached pervious query data by unique name.
  return useQuery(["super-hero", HeroID], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heros")
        ?.data?.find((hero) => hero.id === parseInt(HeroID));
      if (hero) {
        return {
          data: hero,
          //! Note : If the object present we return the result,Here we use data as keyword beacuse in child we used data
          //! else we return undefined
          // ! It is mandatory while using initialData
        };
      } else {
        return undefined;
      }
    },
  });
};

export default useSuperHeroData;
