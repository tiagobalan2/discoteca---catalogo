const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432, 
  username: 'postgres',  
  password: 'Tiago11balan',   
  database: 'catalogo',   
  dialect: 'postgres',
  logging: console.log,    
});

const Album = require('./album')(sequelize, DataTypes);
const Artista = require('./artista')(sequelize, DataTypes);
const Genero = require('./genero')(sequelize, DataTypes);
const Faixa = require('./faixa')(sequelize, DataTypes);

Artista.associate({ Album, Genero });
Album.associate({ Artista, Genero, Faixa });

Object.values(sequelize.models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(sequelize.models);
  }
});

module.exports = { sequelize, Album, Artista, Genero, Faixa };
