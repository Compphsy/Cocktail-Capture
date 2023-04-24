import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
function CocktailTable() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/cocktails')
      .then((res) => res.json())
      .then((data) => setCocktails(data))
      .catch((error) => console.error(error));
  }, []);


  const deleteCocktail = (id) => {
    fetch(`http://localhost:5000/api/cocktails/${id}`, {
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        setCocktails((prevCocktails) =>
          prevCocktails.filter((cocktail) => cocktail._id !== id)
        );
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => console.error(error));
  };

  const [expandedCocktail, setExpandedCocktail] = useState(null);

  const handleExpand = (cocktail) => {
    setExpandedCocktail(cocktail);
  };

  const handleCollapse = () => {
    setExpandedCocktail(null);
  };

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cocktails-container">
      <h2 className='cocktail-title'>Shared Cocktails</h2>
      <input
        type="text"
        placeholder="Search cocktails"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="cocktail-list">
        {filteredCocktails.map((cocktail) => (
          <div key={cocktail._id} className="cocktail-window">
            <div className="cocktail-image">
              {cocktail.image ? (
                <img src={cocktail.image} className="image-icon" alt={cocktail.name} />
              ) : (
                <FontAwesomeIcon icon={faImage} className="image-icon" />
              )}
            </div>
            <div className="cocktail-content">
              <h3>{cocktail.name}</h3>
              {expandedCocktail === cocktail ? (
                <div>
                  <p>Method: {cocktail.method}</p>
                  <p>Ice: {cocktail.ice}</p>
                  <p>Garnish: {cocktail.garnish}</p>
                  <p>Glassware: {cocktail.glassware}</p>
                  <p>Ingredients:</p>
                  <ul>
                    {cocktail.ingredients.map((ingredient) => (
                      <li key={ingredient.name}>{ingredient.name}</li>
                    ))}
                  </ul>
                  <button onClick={handleCollapse}>Hide recipe</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => handleExpand(cocktail)}>Recipe</button>
                  <button onClick={() => deleteCocktail(cocktail._id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default CocktailTable;
