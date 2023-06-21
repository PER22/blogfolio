const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/api/projects');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', projectController.allProjects);

// GET /api/projects/by/123bjh1kg14khj14/
router.get('/by/:userId', projectController.projectsBy);

// GET /api/projects/:projectId
router.get('/:projectId', ensureLoggedIn, projectController.getProjectById);

// POST /api/projects
router.post('/', ensureLoggedIn, projectController.createProject);


// PUT /api/projects/:projectId
router.put('/:projectId', ensureLoggedIn, projectController.updateProject);

// DELETE /api/projects/:projectId - Delete a specific project
router.delete('/:projectId', ensureLoggedIn, projectController.deleteProject);

router.post('/:projectId/star', ensureLoggedIn, projectController.starProject);

router.delete('/:projectId/star', ensureLoggedIn, projectController.unstarProject);

module.exports = router;
