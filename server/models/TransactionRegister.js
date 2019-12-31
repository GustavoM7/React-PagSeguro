const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

module.exports = db.sequelize.define(
  'transationRegister',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    transationCode: {
      type: Sequelize.STRING,
    },

    itemId: {
      type: Sequelize.INTEGER,
    },

    itemQuantity: {
      type: Sequelize.INTEGER,
    },

    itemDescription: {
      type: Sequelize.STRING,
    },

    itemAmount: {
      type: Sequelize.STRING,
    }
    
  },
  {
    timestamps: false,
  }
)