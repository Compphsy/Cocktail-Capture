const asyncHandler = require('express-async-handler');
const Cocktail = require('../models/CocktailModel');

// @desc    Fetch all cocktails from mongodb
// @route   GET /api/cocktails
// @access  Public
const getCocktails = asyncHandler(async (req, res) => {
    const cocktails = await Cocktail.find({});
    if(cocktails.length === 0) {
        res.status(404);
        throw new Error('No cocktails found');
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.json(cocktails);
    }
});

// @desc   Add a cocktail to mongodb database, if location is not empty, add it to the cocktail
// @route   POST /api/cocktails
// @access  Public
const setCocktail = asyncHandler(async (req, res) => {
    const { name, method, ice, glassware, garnish, ingredients, location } = req.body;
    console.log("cocktail data:");
    console.log(req.body);
    const newCocktail = new Cocktail({
        name,
        method,
        ice,
        glassware,
        garnish,
        ingredients,
      });
      // if location is not empty, add it to the cocktail
        if(location) {
            //add latitute and longitude to cocktail
            newCocktail.location = {
                type: 'Point',
                coordinates: [location.longitude, location.latitude],
                formattedAddress: location.formattedAddress
            }
        }
      console.log("new being sent cocktail:");
      console.log(newCocktail);
    await newCocktail.save();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(201).json({ success: true, data: newCocktail });
});

// @desc   Delete a cocktail from mongodb
// @route  DELETE /api/cocktails/:id
// @access Public
const deleteCocktail = asyncHandler(async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id);
  
    if (cocktail) {
      await cocktail.remove();
      res.json({ success: true, message: "Cocktail removed" });
    } else {
      res.status(404);
      throw new Error("Cocktail not found");
    }
  });

// @desc Edit a cocktail in mongodb
// @route PUT /api/cocktails/:id
// @access Public
const editCocktail = asyncHandler(async (req, res) => {
  const cocktail = await Cocktail.findById(req.params.id);

  if(cocktail){
    cocktail.name = req.body.name || cocktail.name;
    cocktail.method = req.body.method || cocktail.method;
    cocktail.ice = req.body.ice || cocktail.ice;
    cocktail.glassware = req.body.glassware || cocktail.glassware;
    cocktail.garnish = req.body.garnish || cocktail.garnish;
    cocktail.ingredients = req.body.ingredients || cocktail.ingredients;
    cocktail.location = req.body.location || cocktail.location;

    const updatedCocktail = await cocktail.save();
    res.json(updatedCocktail);
  }
  else {
    res.status(404);
    throw new Error('Cocktail not found');
  }
});



module.exports = {
    getCocktails,
    setCocktail,
    editCocktail,
    deleteCocktail
};


