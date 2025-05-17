// models/Bank.js
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  bankName: { 
    type: String, 
    required: [true, 'Bank name is required'],
    trim: true
  },
  branch: { 
    type: String, 
    required: [true, 'Branch is required'],
    trim: true
  },
  accountName: { 
    type: String, 
    required: [true, 'Account name is required'],
    trim: true
  },
  accountHolder: { 
    type: String, 
    required: [true, 'Account holder is required'],
    trim: true
  },
  accountNo: { 
    type: String, 
    required: [true, 'Account number is required'],
    unique: true,
    trim: true
  },
  phone: { 
    type: String,
    trim: true
  },
  initialBalance: { 
    type: Number,
    required: [true, 'Initial balance is required'],
    default: 0,
    min: 0
  },
  internetBankingUrl: { 
    type: String,
    trim: true
  },
  status: { 
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  }
}, { 
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Bank', bankSchema);