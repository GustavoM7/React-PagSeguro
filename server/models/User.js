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
      defaultValue: "",
    },
    phone: {
      type: Sequelize.INTEGER,
      defaultValue: "",
    },
    street: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    number: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    complement: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    district: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    postal_code: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    city: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    country: {
      type: Sequelize.STRING,
      defaultValue: "",
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