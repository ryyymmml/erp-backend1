const Client = require('../models/Client');

exports.createClient = async (req, res) => {
  try {
    // 1. Normalize the email first (lowercase + trim)
    const email = req.body.emailAddress?.toLowerCase().trim();
    
    // 2. Early check for existing client using normalized email
    const exists = await Client.findOne({ emailAddress: email });
    if (exists) {
      return res.status(400).json({
        message: "Email already exists",
        existingId: exists._id
      });
    }

    // 3. Rest of your validation...
    if (!req.body.clientType) {
      return res.status(400).json({ message: "Client type is required" });
    }

    // 4. Create and save the new client
    const client = new Client({
      ...req.body,
      emailAddress: email, // Use normalized email
      interactionHistory: []
    });

    await client.save();
    return res.status(201).json(client);

  } catch (err) {
    // Handle duplicate key error separately
    if (err.code === 11000 && err.keyPattern?.emailAddress) {
      return res.status(400).json({ 
        message: "Email already exists (database-level check)" 
      });
    }
    console.error("Create client error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const { clientType, firstName, lastName, companyName, industry, emailAddress, phoneNumber, postalAddress } = req.body;

    if (!clientId) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    if (clientType === 'physique' && (!firstName || !lastName)) {
      return res.status(400).json({
        message: 'First name and last name are required for individual clients',
      });
    }

    if (clientType === 'moral' && (!companyName || !industry)) {
      return res.status(400).json({
        message: 'Company name and industry are required for company clients',
      });
    }

    const updates = {
      ...(clientType && { clientType }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(companyName && { companyName }),
      ...(industry && { industry }),
      ...(emailAddress && { emailAddress }),
      ...(phoneNumber !== undefined && { phoneNumber }),
      ...(postalAddress !== undefined && { postalAddress }),
    };

    const client = await Client.findByIdAndUpdate(clientId, updates, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    if (!clientId) {
      return res.status(400).json({ message: 'Client ID is required' });
    }

    const client = await Client.findByIdAndDelete(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully', deletedClient: client });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};

exports.searchClients = async (req, res) => {
  try {
    const { firstName, lastName, companyName, emailAddress, phoneNumber, clientType } = req.query;
    const filter = {};

    if (firstName) filter.firstName = { $regex: firstName, $options: 'i' };
    if (lastName) filter.lastName = { $regex: lastName, $options: 'i' };
    if (companyName) filter.companyName = { $regex: companyName, $options: 'i' };
    if (emailAddress) filter.emailAddress = { $regex: emailAddress, $options: 'i' };
    if (phoneNumber) filter.phoneNumber = { $regex: phoneNumber, $options: 'i' };
    if (clientType) filter.clientType = clientType;

    const clients = await Client.find(filter);
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error searching clients', error: error.message });
  }
};
