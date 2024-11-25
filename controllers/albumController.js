const { Album, Artista, Genero, Faixa } = require('../models');
const { Op } = require('sequelize');

const albumController = {
  
  // 1. Cadastrar novo álbum
  async createAlbum(req, res) {
    console.log(req.body);
    try {
      const { titulo, anoLancamento, faixas, artistas, generos } = req.body;
      const capa = req.file ? req.file.filename : null;
      console.log({ titulo, anoLancamento, capa, faixas, artistas, generos });
  
      const novoAlbum = await Album.create({ titulo, anoLancamento, capa });

      if (artistas && artistas.length > 0) {
        await novoAlbum.addArtista(artistas);
        console.log('Artistas associados:', artistas);
      }
  
      if (generos && generos.length > 0) {
        await novoAlbum.addGeneros(generos);
        console.log('Generos associados:', generos);
      }
  
      if (faixas && faixas.length > 0) {
        const faixasArray = faixas.split('\n').map(faixa => {
          const [titulo, duracao] = faixa.split(',').map(f => f.trim());
          return { titulo, duracao };
        });
  
        for (const faixa of faixasArray) {
          await Faixa.create({ ...faixa, albumId: novoAlbum.id });
        }
      }
  
      return res.redirect('/albuns');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar álbum' });
    }
  },  

  // 2. Listar álbuns 
  async listAlbums(req, res) {
    try {
      const albums = await Album.findAll({
        include: [
          { model: Artista, attributes: ['nome'], through: { attributes: [] } },
          { model: Genero, attributes: ['nome'], through: { attributes: [] } },
          { model: Faixa, attributes: ['titulo', 'duracao'] }
        ]
      });
      
      console.log(albums);

      res.render('albuns', { albums, message: albums.length === 0 ? 'Nenhum álbum encontrado!' : null });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar álbuns' });
    }
  },

  // 3. Buscar álbuns por título, ano, artista ou gênero
  async searchAlbums(req, res) {
    try {
      const { query } = req.query;
  
      if (!query || query.trim() === "") {
        return res.redirect('/albuns');
      }
  
      const isNumeric = !isNaN(query);
  
      const albums = await Album.findAll({
        include: [
          {
            model: Artista,
            attributes: ['nome'],
            through: { attributes: [] },
            where: {
              nome: { [Op.iLike]: `%${query}%` } 
            },
            required: false, 
          },
          {
            model: Genero,
            attributes: ['nome'],
            through: { attributes: [] },
            required: false 
          },
          {
            model: Faixa,
            attributes: ['titulo', 'duracao'],
            required: false
          }
        ],
        where: {
          [Op.or]: [
            { titulo: { [Op.iLike]: `%${query}%` } }, 
            ...(isNumeric ? [{ anoLancamento: { [Op.eq]: query } }] : [])
          ]
        }
      });
  
      res.render('albuns', {
        albums,
        message: albums.length === 0 ? 'Nenhum álbum encontrado para a pesquisa!' : null
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao realizar a busca de álbuns' });
    }
  },  

  // 4. Atualizar álbum
  async updateAlbum(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anoLancamento, faixas, artistas, generos } = req.body;
      const capa = req.file ? req.file.filename : null;
      console.log({ titulo, anoLancamento, capa, faixas, artistas, generos });

      const album = await Album.findByPk(id);
      if (!album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      await album.update({ titulo, anoLancamento, capa });

      if (artistas && artistas.length > 0) {
        await album.setArtista(artistas);
        console.log('Artistas associados:', artistas);
      }
      if (generos && generos.length > 0) {
        await album.setGeneros(generos);
        console.log('Generos associados:', generos);
      }

      if (faixas && faixas.length > 0) {
        await Faixa.destroy({
          where: {
            albumId: album.id
          }
        });
        const faixasArray = faixas.split('\n').map(faixa => {
          const [titulo, duracao] = faixa.split(',').map(f => f.trim());
          return { titulo, duracao };
        });
  
        for (const faixa of faixasArray) {
          await Faixa.create({ ...faixa, albumId: album.id });
        }
      }

      return res.redirect('/albuns');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar álbum' });
    }
  },

  // 5. Remover álbum
  async deleteAlbum(req, res) {
    try {
      const { id } = req.params;

      const album = await Album.findByPk(id);
      if (!album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }

      await album.destroy();
      return res.redirect('/albuns');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao remover álbum' });
    }
  }
};

module.exports = albumController;