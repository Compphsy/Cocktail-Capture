// import react, us
import React, { useState, useEffect, useRef  } from "react";

// import the add function from the indexDB.js file
import {add} from "../indexDB.js";

// import the uuid function from the uuid package
import { v4 as uuidv4 } from "uuid";

// import react router dom for navigation to the CocktailDashboard page

import { useNavigate } from "react-router-dom";

// import the Webcam component from the react-webcam package
import Webcam from "react-webcam";

// create the AddaCocktail component
const AddaCocktail = () => {
  const webcamRef = useRef(null);



  // use state to store the location and the checkbox value
  const [location, setLocation] = useState({latitude:null, longitude:null});
  const [includelocation, setIncludelocation] = useState(false);

  // use state to store the form elements
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [ice, setIce] = useState("");
  const [garnish, setGarnish] = useState("");
  const [glassware, setGlassware] = useState("");
  const [ingredients, setIngredients] = useState([{id:"", name: "", quantity: "" }]);
  const [imageSrc, setImageSrc] = useState(null);


  const [showCamera, setShowCamera] = useState(false);

  
  // navigate to the CocktailDashboard page 
  const navigate = useNavigate();



  // get the current location
  useEffect(() => {
    // check if the browser supports the geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      // set the location state
      setLocation({
        // set the latitude and longitude
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);



  const handleLocationChange = (event) => {
    const { checked } = event.target;
    setIncludelocation(checked);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

    const handleIceChange = (event) => {
    setIce(event.target.value);
    };

    const handleGarnishChange = (event) => {
    setGarnish(event.target.value);
    };

    const handleGlasswareChange = (event) => {
    setGlassware(event.target.value);
    };


    const handleIngredientNameChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = event.target.value;
    setIngredients(newIngredients);
  };
  const handleIngredientQuantityChange = (event, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    const newIngredients = [...ingredients, {id:"", name: "", quantity: "" }];
    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // handle the form submission
  const handleSubmit = async (event) => {
    // prevent the default form submission
    // stops other buttons from submitting the form
    event.preventDefault();
    // create a cocktail object
    const cocktail = {name, method, ice,garnish,glassware, ingredients};
    // add the location if the checkbox is checked
    if (includelocation) {
      // add the location to the cocktail object
      cocktail.location = { latitude: location.latitude, longitude: location.longitude };
    };
    // create a unique key for the cocktail
    cocktail.myKey = uuidv4() ;
    // add the image to the cocktail object
    cocktail.imageSrc = imageSrc;
    // try to add the cocktail to the database
    try {
      // add the cocktail to the database
      add(cocktail);
      // navigate to the CocktailDashboard page with the cocktail key
      navigate(`/cocktail/${cocktail.myKey}`);
    } 
    // catch any errors
    catch (error) {
      console.error(error);
    }
  };

  
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };



  return (
    <div>
            <>
      <img className = "cocktail-image" src={imageSrc} alt="Cocktail image"/>
      <button type="button" onClick={() => setShowCamera(true)}>Take Photo</button>
      {showCamera && (
        <div>
          <Webcam
            className="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 200,
              height: 200,
              facingMode: "user",
            }}
          />
          <button type="button" onClick={handleCapture}>Capture</button>
        </div>
      )}
    </>
    
      <form onSubmit={handleSubmit}>
      <div className= "geolocation">
          {location.latitude && location.longitude ? (
            <h3>  Your location is: {location.latitude}, {location.longitude} </h3>
          ) : (
            <p>Getting your location...</p>
          )}
          <label htmlFor="includelocation">Include Location:</label>
          <input type="checkbox" id="includelocation" name="includelocation" checked={includelocation} onChange={handleLocationChange} />
          <br />
          </div>
          <label htmlFor="name">Name:</label>
          <input type="text" id ="name" value={name} onChange={handleNameChange} />
          <br />
          <label htmlFor="method">Method:</label>
          <input type="text" id= "method" value={method} onChange={handleMethodChange} />
          <br/>
          <label htmlFor="ice">Ice:</label>
          <input type="text" id= "ice" value={ice} onChange={handleIceChange} />
          <br />
          <label htmlFor="garnish">Garnish:</label>
          <input type="text" id="garnish" value={garnish} onChange={handleGarnishChange} />
          <br />
          <label htmlFor="glassware">Glassware:</label>
          <input type="text" id="glassware" value={glassware} onChange={handleGlasswareChange} />
          <br />
          <label htmlFor="ingredients">Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient.name}
                onChange={(event) => handleIngredientNameChange(event, index)}
                placeholder="Name"
              />
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(event) => handleIngredientQuantityChange(event, index)}
                placeholder="Quantity"
              />
          <button type="button" onClick={() => removeIngredient(index)}>Delete</button>
          </div>
          ))}
          <button type="button" className= "add-button" onClick={addIngredient}>Add Ingredient</button>
          <br/>
          <button type="submit">Upload Cocktail</button>
      </form>
      </div>
  );
};
export default AddaCocktail;