import axios from "axios";
import { useQuery } from "react-query";

const useFetchSuperHeros = (onSuccess, onFailure) => {
  return useQuery(
    "super-heros",
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      onSuccess,
      onError: onFailure,
      select: (data) => {
        return data.data.map((each) => each.name);
      },
    }
  );
};

export default useFetchSuperHeros;
