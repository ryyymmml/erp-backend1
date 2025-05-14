const express = require('express');
   const router = express.Router();
   const userController = require('../controllers/user.controller');
   const { validateUser } = require('../validations/userValidation');
   const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

   router.post('/register', validateUser, userController.register);
   router.get('/', authMiddleware, isAdmin, userController.getUsers);

   module.exports = router;