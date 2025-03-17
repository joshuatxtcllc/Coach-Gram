/**
 * Influencer Marketplace Routes
 */

const express = require('express');
const router = express.Router();
const influencerController = require('../controllers/influencerController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// GET /api/influencers - Search/List influencers
router.get('/', influencerController.searchInfluencers);

// GET /api/influencers/:id - Get influencer details
router.get('/:id', influencerController.getInfluencerById);

// POST /api/influencers/:id/collaborations - Create collaboration request
router.post('/:id/collaborations', influencerController.createCollaborationRequest);

// GET /api/influencers/collaborations - Get collaboration requests
router.get('/collaborations', influencerController.getCollaborationRequests);

// GET /api/influencers/collaborations/:id - Get specific collaboration
router.get('/collaborations/:id', influencerController.getCollaborationById);

// PUT /api/influencers/collaborations/:id - Update collaboration status
router.put('/collaborations/:id', influencerController.updateCollaborationStatus);

// POST /api/influencers/collaborations/:id/message - Send message to influencer
router.post('/collaborations/:id/message', influencerController.sendMessage);

// GET /api/influencers/categories - Get influencer categories
router.get('/categories', influencerController.getCategories);

// POST /api/influencers/:id/favorite - Add influencer to favorites
router.post('/:id/favorite', influencerController.addToFavorites);

// DELETE /api/influencers/:id/favorite - Remove from favorites
router.delete('/:id/favorite', influencerController.removeFromFavorites);

module.exports = router;
