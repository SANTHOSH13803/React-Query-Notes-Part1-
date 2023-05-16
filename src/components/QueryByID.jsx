import React from "react";

import useFetchSuperHeros from "../CustomHooks/FetchSuperHeros";
import { NavLink } from "react-router-dom";

const QueryByID = () => {
  const { data } = useFetchSuperHeros();

  return (
    <div className="p-5">
      <h1>Query By ID</h1>
      <ol>
        {data?.data.map((eachHero) => (
          <li key={eachHero.id}>
            <NavLink to={`/rq-super-heros/${eachHero.id}`}>
              {eachHero.name}
            </NavLink>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default QueryByID;
