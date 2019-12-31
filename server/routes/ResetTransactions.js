const Transaction = require('../models/Transation');
const TransactionRegister = require('../models/TransationRegister');

module.exports = {
  reset(req, res){
    Transaction.drop();
    TransactionRegister.drop();
    res.send("Tabelas removidas!");
  }
}
