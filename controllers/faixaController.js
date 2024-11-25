const { Faixa, Album } = require('../models');

const faixaController = {

  // 1. Cadastrar nova faixa 
  async createTrack(req, res) {
    try {
      const { titulo, duracao, albumId } = req.body;

      const album = await Album.findByPk(albumId);
      if (!album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      const novaFaixa = await Faixa.create({ titulo, duracao, albumId });
      return res.status(201).json(novaFaixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar faixa' });
    }
  },

  // 2. Listar faixas de um álbum específico
  async listTracksByAlbum(req, res) {
    try {
      const { albumId } = req.params;

      const album = await Album.findByPk(albumId, {
        include: { model: Faixa, attributes: ['titulo', 'duracao'] }
      });
      if (!album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      return res.status(200).json(album.Faixas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar faixas' });
    }
  },

  // 3. Buscar faixas por título 
  async searchTracks(req, res) {
    const { titulo } = req.query;

    try {
      const faixas = await Faixa.findAll({
        where: {
          titulo: { [Op.like]: `%${titulo}%` }
        },
        include: { model: Album, attributes: ['titulo'] }
      });
      return res.status(200).json(faixas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro na busca de faixas' });
    }
  },

  // 4. Atualizar informações de uma faixa específica
  async updateTrack(req, res) {
    try {
      const { id } = req.params;
      const { titulo, duracao } = req.body;

      const faixa = await Faixa.findByPk(id);
      if (!faixa) {
        return res.status(404).json({ error: 'Faixa não encontrada' });
      }

      await faixa.update({ titulo, duracao });

      return res.status(200).json(faixa);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar faixa' });
    }
  },

  // 5. Remover faixa
  async deleteTrack(req, res) {
    try {
      const { id } = req.params;

      const faixa = await Faixa.findByPk(id);
      if (!faixa) {
        return res.status(404).json({ error: 'Faixa não encontrada' });
      }

      await faixa.destroy();
      return res.status(200).json({ message: 'Faixa removida com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao remover faixa' });
    }
  }
};

module.exports = faixaController;
