const express = require('express');
const router = express.Router();
const postController = require('../../controllers/api/post');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/posts - Get all blog posts
router.get('/', ensureLoggedIn, postController.list);

// GET /api/posts/:id - Get a specific blog post
router.get('/:id',  postController.getById);

// POST /api/posts - Create a new blog post
router.post('/',  postController.create);

// PUT /api/posts/:id - Update a specific blog post
router.put('/:id',  postController.update);

// DELETE /api/posts/:id - Delete a specific blog post
router.delete('/:id',  postController.remove);

module.exports = router;