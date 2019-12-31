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

    item_id: {
      type: Sequelize.INTEGER,
    },

    item_quantity: {
      type: Sequelize.INTEGER,
    },

    item_description: {
      type: Sequelize.STRING,
    },

    item_amount: {
      type: Sequelize.STRING,
    }
    
  },
  {
    timestamps: false,
  }
)