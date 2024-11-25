const { Sequelize } = require('sequelize'); 

module.exports = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'Tiago11balan',
    database: 'catalogo',
    define: {
        timestamps: true,
        underscored: true
    }
});