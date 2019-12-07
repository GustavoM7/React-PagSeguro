const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './localStorage/database.db'
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;