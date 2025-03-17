/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../validation/authValidation');

// POST /api/auth/register - User registration
router.post('/register', validateRegistration, authController.register);

// POST /api/auth/login - User login
router.post('/login', validateLogin, authController.login);

// POST /api/auth/token - Get new token using refresh token
router.post('/token', authController.refreshToken);

// POST /api/auth/logout - User logout
router.post('/logout', authController.logout);

// GET /api/auth/me - Get current user profile
router.get('/me', authController.getCurrentUser);

// POST /api/auth/verify-email - Verify email address
router.post('/verify-email', authController.verifyEmail);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', authController.resetPassword);

module.exports = router;
