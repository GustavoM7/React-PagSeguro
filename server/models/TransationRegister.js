const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

const Transation = require('./Transation');
const Item = require('./Item');

module.exports = db.sequelize.define(
  'transationRegister',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    transationCode: {
      reference: {
        model: Transation,
        key: 'code'
      }
    },

    item_id: {
      reference: {
        model: Item,
        key: 'id'
      }
    },

    item_quantity: {
      type: Sequelize.INTEGER,
    }
    
  },
  {
    timestamps: false,
  }
)