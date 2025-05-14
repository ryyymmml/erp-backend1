const bankService = require('../services/bank.service');
const { validationResult } = require('express-validator');

class BankController {
  // Create a new bank
  async createBank(req, res) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const bank = await bankService.createBank(req.body);
      res.status(201).json({
        success: true,
        data: bank,
        message: 'Bank created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get all banks
  async getAllBanks(req, res) {
    try {
      const banks = await bankService.getAllBanks();
      res.status(200).json({
        success: true,
        data: banks,
        message: 'Banks retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get a single bank by ID
  async getBankById(req, res) {
    try {
      const bank = await bankService.getBankById(req.params.id);
      res.status(200).json({
        success: true,
        data: bank,
        message: 'Bank retrieved successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Bank not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update a bank
  async updateBank(req, res) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const bank = await bankService.updateBank(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: bank,
        message: 'Bank updated successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Bank not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete a bank
  async deleteBank(req, res) {
    try {
      const bank = await bankService.deleteBank(req.params.id);
      res.status(200).json({
        success: true,
        data: bank,
        message: 'Bank deleted successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Bank not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get bank by account number
  async getBankByAccountNumber(req, res) {
    try {
      const bank = await bankService.getBankByAccountNumber(req.params.accountNo);
      res.status(200).json({
        success: true,
        data: bank,
        message: 'Bank retrieved successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Bank not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update bank status
  async updateBankStatus(req, res) {
    try {
      const { status } = req.body;
      if (!['active', 'inactive', 'suspended'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }

      const bank = await bankService.updateBankStatus(req.params.id, status);
      res.status(200).json({
        success: true,
        data: bank,
        message: 'Bank status updated successfully'
      });
    } catch (error) {
      const statusCode = error.message === 'Bank not found' ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new BankController();