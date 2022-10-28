import React, { useEffect, useState } from "react";
import "./Recipe.css";

import { useParams, useHistory } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

export default function Recipe() {
  //was const params = useParams() but he deconstructured it to id
  const { id } = useParams();
  const history = useHistory();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find the recipe");
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      });
    //this fires when this component unmounts
    return () => unsub();
  }, [id, history]);

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "new title",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <>
          <h2 className="page-title">
            {recipe.title.charAt(0).toUpperCase() +
              recipe.title.slice(1).toLowerCase()}
          </h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}
