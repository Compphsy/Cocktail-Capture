import React, { useEffect, useState } from 'react'

import {get} from '../indexDB.js';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/cocktailDashboard.css';
function CocktailDashboard({key}) {
    const [cocktail,setCocktail] = useState(null);
    // useEffect hook that runs a cocktail when the component is mounted
    useEffect(() => {
        get(key).then((cocktail) => {
            setCocktail(cocktail);
        });
    }, [key]);
    if (!cocktail) {
        return <div>Loading...</div>;
    }
    console.log('cocktail.imageSrc:', cocktail.imageSrc);

return (
  <div className="recipe-card">
    <div className="cocktail-recipe-header">
      {cocktail.imageSrc ? (
        <img className="cocktail-image" src={cocktail.imageSrc} alt="A capture of a delicious cocktail" />
      ) : (
        <FontAwesomeIcon icon={faImage} style={{ fontSize: "200px" }} />
      )}
      <h2 className="cocktail-header">{cocktail.name}</h2>
    </div>
    <hr />
    <p>Method: {cocktail.method}</p>
    <hr />
    <p>Ice: {cocktail.ice}</p>
    <hr />
    <p>Garnish: {cocktail.garnish}</p>
    <hr />
    <p>Glassware: {cocktail.glassware}</p>
    <hr />
    <p>
      Ingredients:{" "}
      {cocktail.ingredients.map((ingredient) => (
        <li>
          {ingredient.quantity} {ingredient.name}
        </li>
      ))}
    </p>
    <hr/>
    <div className="action-buttons">
      <Link to="/view" className="button">Back</Link>
      <Link to={`/edit/${key}`} className="button">Edit</Link>
    </div>
  </div>
);
      };
export default CocktailDashboard;