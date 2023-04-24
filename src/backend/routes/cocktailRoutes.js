const express = require('express');
const router = express.Router();

const {
    getCocktails,
    setCocktail,
    editCocktail,
    deleteCocktail
} = require('../controllers/cocktailController');

router.get('/', getCocktails);
router.post('/', setCocktail);
router.delete('/:id', deleteCocktail);
router.put(/:id/, editCocktail);
module.exports = router;

