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
      defaultValue: null,
    },
    phone: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    street: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    number: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    complement: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    district: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    postal_code: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    city: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    country: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
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