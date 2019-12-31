const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

module.exports = db.sequelize.define(
  'transaction',
  {
    code: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATE,
    },
    reference: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    paymentMethod: {
      type: Sequelize.INTEGER,
    },
    grossAmount: {
      type: Sequelize.STRING,
    },
    discountAmount: {
      type: Sequelize.STRING,
    },
    intermediationRateAmount: {
      type: Sequelize.STRING,
    },
    intermediationFeeAmount: {
      type: Sequelize.STRING,
    },
    netAmount: {
      type: Sequelize.STRING,
    },
    extraAmount: {
      type: Sequelize.STRING,
    },
    installmentCount: {
      type: Sequelize.INTEGER,
    },
    itemCount: {
      type: Sequelize.INTEGER,
    },
    senderName: {
      type: Sequelize.STRING,
    },
    senderEmail: {
      type: Sequelize.STRING,
    },
    senderPhoneAreaCode: {
      type: Sequelize.STRING,
    },
    senderPhoneNumber: {
      type: Sequelize.STRING,
    },
    shippingStreet: {
      type: Sequelize.STRING,
    },
    shippingNumber: {
      type: Sequelize.STRING,
    },
    shippingComprement: {
      type: Sequelize.STRING,
    },
    shippingDistrict: {
      type: Sequelize.STRING,
    },
    shippingPostalCode: {
      type: Sequelize.STRING,
    },
    shippingCity: {
      type: Sequelize.STRING,
    },
    shippingState: {
      type: Sequelize.STRING,
    },
    shippingCountry: {
      type: Sequelize.STRING,
    },
    shippingCost: {
      type: Sequelize.STRING,
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);