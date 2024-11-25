const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const { Album, Artista, Genero, Faixa } = require('../models'); // Certifique-se de que está importando os modelos corretamente
const upload = require('../middlewares/upload');

// Definir as rotas para o álbum
router.post('/', upload.single('capa'), albumController.createAlbum);

// Rota GET para renderizar o formulário de criação de álbum
router.get('/novo', async (req, res) => {
    try {
      const artists = await Artista.findAll();
      const geners = await Genero.findAll();
  
      return res.render('albumForm', {
        album: null,
        artists: artists,
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

    const album = await Album.findByPk(id, {
      include: [Artista, Genero, Faixa], 
    });

    console.log(album.Faixas);

    if (!album) {
      return res.status(404).send('Álbum não encontrado');
    }

    const artists = await Artista.findAll();
    const geners = await Genero.findAll();

    return res.render('albumForm2', {
      album: album,
      artists: artists,
      geners: geners    
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao carregar o formulário' });
  }
});

router.get('/', albumController.listAlbums);
router.get('/search', albumController.searchAlbums);
router.put('/:id', upload.single('capa'), albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;


