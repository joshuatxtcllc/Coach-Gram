/**
 * AI Services Routes
 */

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// POST /api/ai/generate/caption - Generate post captions
router.post('/generate/caption', aiController.generateCaptions);

// POST /api/ai/generate/hashtags - Generate hashtag suggestions
router.post('/generate/hashtags', aiController.generateHashtags);

// POST /api/ai/analyze/content - Analyze content performance
router.post('/analyze/content', aiController.analyzeContent);

// POST /api/ai/coach/strategy - Get strategy recommendations
router.post('/coach/strategy', aiController.getStrategyRecommendations);

// POST /api/ai/coach/competitor - Analyze competitor strategy
router.post('/coach/competitor', aiController.analyzeCompetitor);

// POST /api/ai/optimize/schedule - Get optimal posting schedule
router.post('/optimize/schedule', aiController.getOptimalSchedule);

// POST /api/ai/trends/discover - Discover trending topics
router.post('/trends/discover', aiController.discoverTrends);

module.exports = router;
