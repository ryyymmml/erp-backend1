const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientType: {
    type: String,
    required: true,
    enum: ['physique', 'moral'],
  },
  firstName: {
    type: String,
    trim: true,
    required: function() {
      return this.clientType === 'physique';
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: function() {
      return this.clientType === 'physique';
    },
  },
  companyName: {
    type: String,
    trim: true,
    required: function() {
      return this.clientType === 'moral';
    },
  },
  industry: {
    type: String,
    trim: true,
    required: function() {
      return this.clientType === 'moral';
    },
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: '',
  },
  postalAddress: {
    type: String,
    trim: true,
    default: '',
  },
  interactionHistory: {
    type: [String],
    default: [],
  }
}, { 
  timestamps: true // Handles createdAt and updatedAt automatically
});

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

module.exports = Client;