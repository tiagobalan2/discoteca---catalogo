const { Genero, Album, Artista } = require('../models');
const { Op } = require('sequelize');

const generoController = {

  // 1. Cadastrar novo gênero
  async createGenre(req, res) {
    try {
      const { nome } = req.body;

      const novoGenero = await Genero.create({ nome });

      return res.status(201).json(novoGenero);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar gênero' });
    }
  },

  // 2. Listar gêneros 
  async listGenres(req, res) {
    try {
      const genres = await Genero.findAll({
        include: [
          { model: Album, attributes: ['titulo', 'anoLancamento'], through: { attributes: [] } },
          { model: Artista, attributes: ['nome'], through: { attributes: [] } }
        ]
      });
      return res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar gêneros' });
    }
  },

  // 3. Buscar gêneros por nome
  async searchGenres(req, res) {
    const { nome } = req.query;

    try {
      const genres = await Genero.findAll({
        where: {
          nome: { [Op.like]: `%${nome}%` }
        },
        include: [
          { model: Album, attributes: ['titulo', 'anoLancamento'], through: { attributes: [] } },
          { model: Artista, attributes: ['nome'], through: { attributes: [] } }
        ]
      });
      return res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro na busca de gêneros' });
    }
  },

  // 4. Atualizar gênero
  async updateGenre(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const genero = await Genero.findByPk(id);
      if (!genero) {
        return res.status(404).json({ error: 'Gênero não encontrado' });
      }

      await genero.update({ nome });

      return res.status(200).json(genero);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar gênero' });
    }
  },

  // 5. Remover gênero
  async deleteGenre(req, res) {
    try {
      const { id } = req.params;

      const genero = await Genero.findByPk(id);
      if (!genero) {
        return res.status(404).json({ error: 'Gênero não encontrado' });
      }

      await genero.destroy();
      return res.status(200).json({ message: 'Gênero removido com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao remover gênero' });
    }
  }
};

module.exports = generoController;
