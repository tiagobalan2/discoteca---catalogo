const express = require('express');
const router = express.Router();
const faixaController = require('../controllers/faixaController');

router.post('/', faixaController.createTrack);
router.get('/', faixaController.listTracks);
router.put('/:id', faixaController.updateTrack);
router.delete('/:id', faixaController.deleteTrack);

module.exports = router;
