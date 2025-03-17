/**
 * Content Management Routes
 */

const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// GET /api/content - Get all content
router.get('/', contentController.getContent);

// POST /api/content - Create new content
router.post('/', contentController.createContent);

// GET /api/content/:id - Get specific content
router.get('/:id', contentController.getContentById);

// PUT /api/content/:id - Update content
router.put('/:id', contentController.updateContent);

// DELETE /api/content/:id - Delete content
router.delete('/:id', contentController.deleteContent);

// POST /api/content/upload - Upload media
router.post('/upload', contentController.uploadMedia);

// POST /api/content/:id/publish - Publish content immediately
router.post('/:id/publish', contentController.publishContent);

// POST /api/content/:id/schedule - Schedule content for later
router.post('/:id/schedule', contentController.scheduleContent);

module.exports = router;
