const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

module.exports = db.sequelize.define(
  'item',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    description: {
      type: Sequelize.STRING,
    },

    amount: {
      type: Sequelize.STRING,
    },

    weight: {
      type: Sequelize.STRING,
    }
  },

  {
    timestamps: false,
  }
);