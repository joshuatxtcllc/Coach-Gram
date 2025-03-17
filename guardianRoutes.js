/**
 * Account Guardian Routes
 */

const express = require('express');
const router = express.Router();
const guardianController = require('../controllers/guardianController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// POST /api/protection/backup - Create follower backup
router.post('/backup', guardianController.createBackup);

// GET /api/protection/backups - Get backup history
router.get('/backups', guardianController.getBackups);

// GET /api/protection/backups/:id - Get specific backup
router.get('/backups/:id', guardianController.getBackupById);

// DELETE /api/protection/backups/:id - Delete a backup
router.delete('/backups/:id', guardianController.deleteBackup);

// POST /api/protection/recovery/message - Generate recovery messages
router.post('/recovery/message', guardianController.generateRecoveryMessages);

// POST /api/protection/recovery/notify - Send recovery notifications
router.post('/recovery/notify', guardianController.sendRecoveryNotifications);

// GET /api/protection/settings - Get protection settings
router.get('/settings', guardianController.getSettings);

// PUT /api/protection/settings - Update protection settings
router.put('/settings', guardianController.updateSettings);

module.exports = router;
