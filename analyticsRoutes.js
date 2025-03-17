/**
 * Analytics Routes
 */

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// GET /api/analytics/overview - Get analytics overview
router.get('/overview', analyticsController.getOverview);

// GET /api/analytics/followers - Get follower analytics
router.get('/followers', analyticsController.getFollowerAnalytics);

// GET /api/analytics/content - Get content performance analytics
router.get('/content', analyticsController.getContentAnalytics);

// GET /api/analytics/engagement - Get engagement analytics
router.get('/engagement', analyticsController.getEngagementAnalytics);

// GET /api/analytics/audience - Get audience insights
router.get('/audience', analyticsController.getAudienceInsights);

// GET /api/analytics/competitor - Get competitor comparison
router.get('/competitor', analyticsController.getCompetitorAnalytics);

// GET /api/analytics/reports - Generate custom report
router.get('/reports', analyticsController.generateReport);

// GET /api/analytics/export - Export analytics data
router.get('/export', analyticsController.exportData);

module.exports = router;
