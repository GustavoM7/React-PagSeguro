const Transaction = require('../models/Transaction');
const TransactionRegister = require('../models/TransactionRegister');

module.exports = {
  reset(req, res){
    Transaction.drop();
    TransactionRegister.drop();
    res.send("Tabelas removidas!");
  }
}
