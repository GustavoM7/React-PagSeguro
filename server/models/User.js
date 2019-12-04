const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

module.exports = db.sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    phone_code: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    street: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.INTEGER,
    },
    complement: {
      type: Sequelize.STRING,
    },
    district: {
      type: Sequelize.STRING,
    },
    postal_code: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  },
  {
    timestamps: false,
  }
);