const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

module.exports = db.sequelize.define(
  'transactionRegister',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    transactionCode: {
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