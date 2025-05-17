// routes/client.routes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller'); 

// Client Routes
router.post('/', clientController.createClient);
router.get('/search', clientController.searchClients); // placed before '/:id'
router.get('/', clientController.getAllClients);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
