const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/get_user', authenticateToken, userController.getUser);

module.exports = router;
