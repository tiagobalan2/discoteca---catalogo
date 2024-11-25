module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define("Genero", {
      nome: DataTypes.STRING,
    }, {
        timestamps: true,  // Garantir que o Sequelize preencha automaticamente createdAt e updatedAt

    });
  
    Genero.associate = (models) => {
      Genero.belongsToMany(models.Album, { through: 'AlbumGeneros' });
      Genero.belongsToMany(models.Artista, { through: 'ArtistaGeneros' });
    };
  
    return Genero;
  };
  