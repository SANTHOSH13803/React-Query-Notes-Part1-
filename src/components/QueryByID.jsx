import React from "react";

import { useFormik } from "formik";

import useFetchSuperHeros from "../CustomHooks/FetchSuperHeros";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.alterEgo) {
    errors.alterEgo = "Required";
  }
  return errors;
};

const QueryByID = () => {
  // *********************************************

  const queryClient = useQueryClient();

  // posting call back funtion
  const { mutate: addHero } = useMutation(
    (hero) => {
      return axios.post("http://localhost:4000/superheroes", hero);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("super-heros");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      alterEgo: "",
    },
    onSubmit: (values) => {
      const hero = { name: values.name, alterEgo: values.alterEgo };
      // Mutaions (POST)
      addHero(hero); // this line will post the data
      // if we have multiple mutate we can use alias.
    },
    validate,
  });

  // *********************************************
  const { data, refetch } = useFetchSuperHeros();

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
      <button onClick={refetch}>Fetch Heros</button>

      <div className="p-3 shaodow-lg">
        <h1>Mutations</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex gap-2">
            <label htmlFor="hero">Hero Name</label>
            <input
              type="text"
              id="hero"
              name="name"
              onChange={formik.handleChange}
            />
          </div>
          <p>{formik.errors.name}</p>
          <div className="d-flex gap-2 mt-5">
            <label htmlFor="alter-ego">Alter Ego Name</label>
            <input
              type="text"
              id="alter-ego"
              name="alterEgo"
              onChange={formik.handleChange}
            />
          </div>
          <p>{formik.errors.alterEgo}</p>
          <div>
            <button className="btn btn-primary" type="submit">
              Add hero
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryByID;
