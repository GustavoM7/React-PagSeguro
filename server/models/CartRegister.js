const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

const User = require('./User');
const Item = require('./Item');

module.exports = db.sequelize.define(
  'CartRegister',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      reference: {
        model: User,
        key: 'id',
      }
    },

    item_id: {
      reference: {
        model: Item,
        key: 'id',
      }
    },

    quantity: {
      type: Sequelize.INTEGER,
    },
  
  },
  {
    timestamps: false,
  }
)