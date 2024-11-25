module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Faixas', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      titulo: { type: Sequelize.STRING },
      duracao: { type: Sequelize.STRING },
      albumId: { type: Sequelize.INTEGER, references: { model: 'Albums', key: 'id' } },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Faixas');
  },
};
