import React from "react";

import { useParams } from "react-router-dom";
import useSuperHeroData from "../CustomHooks/useSuperHeroData";
// Shows single super hero //
const RQSuperHero = () => {
  const { heroId } = useParams();
  const { isLoading, isError, data, error } = useSuperHeroData(heroId);
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (isError) {
    return <p className="text-danger">{error.message}</p>;
  }

  return (
    <div>
      <p>{data.data.id}</p>
      <div className="d-flex">
        <p>Hero</p>
        <h1>{data.data.name}</h1>
      </div>
      <p>Alter Ego</p>
      <h3>{data.data.alterEgo}</h3>
    </div>
  );
};

export default RQSuperHero;
