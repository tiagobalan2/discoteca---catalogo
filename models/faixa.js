module.exports = (sequelize, DataTypes) => {
    const Faixa = sequelize.define("Faixa", {
      titulo: DataTypes.STRING,
      duracao: DataTypes.STRING,
      albumId: DataTypes.INTEGER,
    }, {
        timestamps: true,  // Garantir que o Sequelize preencha automaticamente createdAt e updatedAt

    });
  
    Faixa.associate = (models) => {
      Faixa.belongsTo(models.Album, { foreignKey: 'albumId' });
    };
  
    return Faixa;
  };
  