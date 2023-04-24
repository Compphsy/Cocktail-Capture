import React, { useState, useEffect, useRef } from "react";


import { get, editCocktail, remove } from "../indexDB.js";

import { useNavigate } from 'react-router-dom';
import '../App.css'

// import Webcam from "react-webcam";
import Webcam from "react-webcam";


const EditACocktail = ({ id }) => {

  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [ice, setIce] = useState("");
  const [garnish, setGarnish] = useState("");
  const [glassware, setGlassware] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [cocktail, setCocktail] = useState(null);

  // state for the camera
  const [showCamera, setShowCamera] = useState(false);
  // state for the camera capture to be open
  const [cameraOpen, setCameraOpen] = useState(false);

// arrow function to handle the camera capture
  const handleCapture = () => {
    // get the image from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      console.log('Captured Image: ', imageSrc);
      // set the imageSrc state
      setImageSrc(imageSrc);
    }
  };
 // toggle the camera on and off
  const toggleCamera = () => {
    setShowCamera(!showCamera);
    setCameraOpen(!cameraOpen);
  };

  useEffect(() => {
    // get the cocktail from the indexDB
    get(id).then((cocktail) => {
      // set the state of the cocktail
      setCocktail(cocktail);
    });
  }, [id]);

  
  useEffect(() => {
    if (cocktail) {
      setName(cocktail.name);
      setMethod(cocktail.method);
      setIce(cocktail.ice);
      setGarnish(cocktail.garnish);
      setGlassware(cocktail.glassware);
      setIngredients(cocktail.ingredients);
      setImageSrc(cocktail.imageSrc);
    }
  }, [cocktail]);

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

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };
  
  const handleDeleteIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  if (!cocktail) {
    return <div>Loading or no cocktail found</div>;
  }




  // handle the form submission
  const handleSubmit = (event) => {
    // prevent the default form submission behavior
    // stops other buttons from sending the form
    event.preventDefault();
    // create a new cocktail object
    const editedCocktail = {
      ...cocktail,
      name,
      method,
      ice,
      garnish,
      glassware,
      ingredients,
      imageSrc
    };
    // call the editCocktail function
    editCocktail(editedCocktail);
    // navigate to the View page
    navigate(`/cocktail/${cocktail.myKey}`);
  };



  const handleDelete = () => {
    remove(cocktail.myKey);
    navigate("/View");
  };
  
  const handleCameraError = (error) => {
    console.error('Error initializing camera:', error);
  };

 

  return (
    <div>
        {imageSrc ? (
    <img className="cocktail-image" src={imageSrc} alt="A capture of a delicious cocktail" />
  ) : (
    <img className="fimage" alt= "font awesome dummy capture in place of a cocktail"></img>
  )}
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />
      <br />
      <label htmlFor="method">Method:</label>
      <input type="text" id="method" value={method} onChange={handleMethodChange} />
      <br />
      <label htmlFor="ice">Ice:</label>
      <input type="text" id="ice" value={ice} onChange={handleIceChange} />
      <br />
      <label htmlFor="garnish">Garnish:</label>
      <input type="text" id="garnish" value={garnish} onChange={handleGarnishChange} />
      <br />
      <label htmlFor="glassware">Glassware:</label>
      <input type="text" id="glassware" value={glassware} onChange={handleGlasswareChange} />
      <br />
      <div>
        <label>Ingredients:</label>
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
            <button type="button" onClick={() => handleDeleteIngredient(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
         
      <>
      <button type="button" onClick={toggleCamera}>
        {cameraOpen ? "Close Capture" : "Take Photo"}
      </button>
      {showCamera && (
        <div>
          <Webcam
            className="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 150,
              height: 150,
              facingMode: "user",
              onUserMediaError: handleCameraError
            }}
          />
          <button type="button" onClick={handleCapture}>
            Capture
          </button>
        </div>
      )}
    </>
    </div> 
      <button type="submit">Save Changes</button>
      <button className = "delete-button" type="button" onClick={handleDelete}>Delete Cocktail</button>
    </form>
    </div>
  );
        };
export default EditACocktail;