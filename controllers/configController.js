const BankConfig = require('../models/Bank');
const BillingConfig = require('../models/BillingConfig');
const AccountingConfig = require('../models/AccountingConfig');
const PaymentMethod = require('../models/PaymentMethod');

// CRUD Configuration Banque
exports.createBank = async (req, res) => {
  try {
    const bank = new BankConfig(req.body);
    await bank.save();
    res.status(201).json({ success: true, data: bank });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBanks = async (req, res) => {
  try {
    const banks = await BankConfig.find();
    res.status(200).json({ success: true, data: banks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CRUD Configuration Facturation
exports.createBilling = async (req, res) => {
  try {
    const billing = new BillingConfig(req.body);
    await billing.save();
    res.status(201).json({ success: true, data: billing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBillings = async (req, res) => {
  try {
    const billings = await BillingConfig.find();
    res.status(200).json({ success: true, data: billings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CRUD Configuration Comptabilité
exports.createAccounting = async (req, res) => {
  try {
    const accounting = new AccountingConfig(req.body);
    await accounting.save();
    res.status(201).json({ success: true, data: accounting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAccountings = async (req, res) => {
  try {
    const accountings = await AccountingConfig.find();
    res.status(200).json({ success: true, data: accountings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CRUD Configuration Moyens de Paiement
exports.createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = new PaymentMethod(req.body);
    await paymentMethod.save();
    res.status(201).json({ success: true, data: paymentMethod });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res.status(200).json({ success: true, data: paymentMethods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
