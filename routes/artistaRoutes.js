const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');
const { Album, Artista, Genero } = require('../models');

// Definir as rotas para o artista
router.post('/', artistaController.createArtist);

router.get('/novo', async (req, res) => {
    try {
      const geners = await Genero.findAll();
  
      return res.render('artistaForm', {
        artists: null,
        geners: geners    
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao carregar o formulário' });
    }
});

router.get('/:id/editar', async (req, res) => {
  try {
    const { id } = req.params;

    const artista = await Artista.findByPk(id, {
    });

    if (!artista) {
      return res.status(404).send('Artista não encontrado');
    }

    const geners = await Genero.findAll();

    return res.render('artistaForm2', {
      artista: artista,
      geners: geners    
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao carregar o formulário' });
  }
});

router.get('/', artistaController.listArtists);
router.get('/search', artistaController.searchArtists);
router.put('/:id', artistaController.updateArtist);
router.delete('/:id', artistaController.deleteArtist);

module.exports = router;