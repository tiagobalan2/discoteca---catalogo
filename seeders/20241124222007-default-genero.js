'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const generosPadrao = [
      { nome: 'Rock', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Pop', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Jazz', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Clássica', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Hip-Hop', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Funk', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Gospel', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Sertanejo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Samba', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Forró', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Reggaeton', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Eletrônica', createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('Generos', generosPadrao, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Generos', null, {});
  }
};

