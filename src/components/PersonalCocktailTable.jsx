import React, { useState, useEffect } from 'react'
import {getAll} from '../indexDB.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../stylesheets/cocktailTable.css';
function PersonalCocktailTable() {
    
    const [expandedCocktail, setExpandedCocktail] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // cocktails state that is initialized to an empty array
    const [cocktails, setCocktails] = React.useState([]);


    // useEffect hook that runs a function when the component is mounted
    useEffect(() => {
        // get all cocktails from the database
        getAll().then((cocktails) => {
            // set the cocktails state to the cocktails from the database
            setCocktails(cocktails);
        });
    }, []);


    // handle the click event on a cocktail
    const handleCollapse = () => {
      // set the expandedCocktail state to null
      setExpandedCocktail(null);
    };


    // filter the cocktails based on the search term
    const filteredCocktails = cocktails.filter((cocktail) =>
    // check if the cocktail name includes the search term (case insensitive)
    cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    return (
      <div className="cocktails-container">
        <h2 className='cocktail-title'>Shared Cocktails</h2>
        <input type="text" placeholder="Search cocktails" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
        <div className="cocktail-list">
          {filteredCocktails.map((cocktail) => (
            <div key={cocktail.myKey} className="cocktail-window">
              <div className="cocktail-image-table">
                {cocktail.imageSrc ? (
                  <img src={cocktail.imageSrc} className="image-icon" alt={cocktail.name} />
                ) : (
                  <FontAwesomeIcon icon={faImage} className="image-icon" />
                )}
              </div>
              <div className="cocktail-content">
                <h3>{cocktail.name}</h3>
                {expandedCocktail === cocktail ? (
                  <div>
                    <p>To make {cocktail.name}, you need: {`${cocktail.ingredients.slice(0, -1).map(ingredient => ingredient.name).join(", ")} and ${cocktail.ingredients.slice(-1)[0].name}`}</p>
                    <button onClick={handleCollapse}>Hide Description</button>
                    <button>
                      <Link to={`/cocktail/${cocktail.myKey}`}>View Recipe</Link>
                    </button>
                    <button>
                      <Link to={`/edit/${cocktail.myKey}`}>Edit Recipe</Link>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setExpandedCocktail(cocktail)}>Toggle description</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
export default PersonalCocktailTable;