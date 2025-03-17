/**
 * Campaign Management Routes
 */

const express = require('express');
const router = express.Router();
const campaignsController = require('../controllers/campaignsController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// GET /api/campaigns - Get all campaigns
router.get('/', campaignsController.getCampaigns);

// POST /api/campaigns - Create a new campaign
router.post('/', campaignsController.createCampaign);

// GET /api/campaigns/:id - Get specific campaign
router.get('/:id', campaignsController.getCampaignById);

// PUT /api/campaigns/:id - Update campaign
router.put('/:id', campaignsController.updateCampaign);

// DELETE /api/campaigns/:id - Delete campaign
router.delete('/:id', campaignsController.deleteCampaign);

// GET /api/campaigns/templates - Get campaign templates
router.get('/templates', campaignsController.getCampaignTemplates);

// POST /api/campaigns/:id/publish - Publish campaign
router.post('/:id/publish', campaignsController.publishCampaign);

// POST /api/campaigns/:id/pause - Pause campaign
router.post('/:id/pause', campaignsController.pauseCampaign);

// POST /api/campaigns/:id/resume - Resume campaign
router.post('/:id/resume', campaignsController.resumeCampaign);

// GET /api/campaigns/:id/analytics - Get campaign analytics
router.get('/:id/analytics', campaignsController.getCampaignAnalytics);

module.exports = router;
