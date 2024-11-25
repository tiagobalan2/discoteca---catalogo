const { Artista, Album, Genero } = require('../models');
const { Op } = require('sequelize');

const artistaController = {
  
  // 1. Cadastrar novo artista
  async createArtist(req, res) {
    console.log(req.body);
    try {

      const { nome, albuns, generos } = req.body;

      const novoArtista = await Artista.create({ nome });

      if (albuns && albuns.length > 0) {
        await novoArtista.setAlbuns(albuns);
      }

      if (generos && generos.length > 0) {
        await novoArtista.setGeneros(generos);
      }

      return res.redirect('/artistas');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar artista' });
    }
  },

  // 2. Listar artistas 
  async listArtists(req, res) {
    try {
      const artists = await Artista.findAll({
        include: [
          { model: Album, attributes: ['titulo', 'anoLancamento'], through: { attributes: [] } },
          { model: Genero, attributes: ['nome'], through: { attributes: [] } }
        ]
      });

      res.render('artistas', { artists, message: artists.length === 0 ? 'Nenhum artista encontrado!' : null });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar artistas' });
    }
  },

  // 3. Buscar artistas por nome ou gênero 
  async searchArtists(req, res) {
    try {
      const { query } = req.query;
  
      if (!query || query.trim() === "") {
        return res.redirect('/artistas'); 
      }
  
      const artistas = await Artista.findAll({
        where: {
          [Op.or]: [
            { nome: { [Op.iLike]: `%${query}%` } }
          ]
        },
        include: [{
          model: Genero, 
          attributes: ['nome'] 
        }]
      });
  
      res.render('artistas', {
        artists: artistas, 
        message: artistas.length === 0 ? 'Nenhum artista encontrado para a pesquisa!' : null
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao realizar a busca de artistas' });
    }
  },  

  // 4. Atualizar artista
  async updateArtist(req, res) {
    try {
      const { id } = req.params;
      const { nome, albuns, generos } = req.body;

      const artista = await Artista.findByPk(id);
      if (!artista) {
        return res.status(404).json({ error: 'Artista não encontrado' });
      }

      await artista.update({ nome });

      if (albuns && albuns.length > 0) {
        await artista.setAlbuns(albuns);
      }
      if (generos && generos.length > 0) {
        await artista.setGeneros(generos);
      }

      return res.redirect('/artistas');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar artista' });
    }
  },

  // 5. Remover artista
  async deleteArtist(req, res) {
    try {
      const { id } = req.params;

      const artista = await Artista.findByPk(id);
      if (!artista) {
        return res.status(404).json({ error: 'Artista não encontrado' });
      }

      await artista.destroy();
      return res.redirect('/artistas');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao remover artista' });
    }
  }
};

module.exports = artistaController;

