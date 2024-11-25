const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.post('/', generoController.createGenre);
router.get('/', generoController.listGenres);
router.get('/search', generoController.searchGenres);
router.put('/:id', generoController.updateGenre);
router.delete('/:id', generoController.deleteGenre);

module.exports = router;