const Sequelize = require('sequelize');
const db = require('../localStorage/db.js');

module.exports = db.sequelize.define(
  'transation',
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
    itemsCount: {
      type: Sequelize.INTEGER,
    },
    senderName: {
      type: Sequelize.STRING,
    },
    senderEmail: {
      type: Sequelize.STRING,
    },
    senderPhone: {
      type: Sequelize.STRING,
    },
    ShippingStreet: {
      type: Sequelize.STRING,
    },
    ShippingNumber: {
      type: Sequelize.STRING,
    },
    ShippingComprement: {
      type: Sequelize.STRING,
    },
    ShippingDistrict: {
      type: Sequelize.STRING,
    },
    ShippingPostalCode: {
      type: Sequelize.STRING,
    },
    ShippingCity: {
      type: Sequelize.STRING,
    },
    ShippingState: {
      type: Sequelize.STRING,
    },
    ShippingCountry: {
      type: Sequelize.STRING,
    },
    ShippingCost: {
      type: Sequelize.STRING,
    },
    items_id: {
      reference:{
        model: Cart,
        key: 'id',
      }
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