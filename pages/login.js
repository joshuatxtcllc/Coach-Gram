/**
 * Social Accounts Routes
 */

const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// GET /api/accounts - Get all connected accounts
router.get('/', accountsController.getAccounts);

// POST /api/accounts/connect - Connect a new social account
router.post('/connect', accountsController.connectAccount);

// GET /api/accounts/:id - Get a specific account
router.get('/:id', accountsController.getAccountById);

// DELETE /api/accounts/:id - Disconnect an account
router.delete('/:id', accountsController.disconnectAccount);

// PUT /api/accounts/:id - Update account settings
router.put('/:id', accountsController.updateAccount);

// GET /api/accounts/:id/sync - Sync account data
router.get('/:id/sync', accountsController.syncAccount);

module.exports = router;
