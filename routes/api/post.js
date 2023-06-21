const express = require('express');
const router = express.Router();
const postController = require('../../controllers/api/post');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/posts - Get all blog posts
router.get('/', postController.list);

// GET /api/posts/:postId - Get a specific blog post
router.get('/:postId',  postController.getById);

// POST /api/posts - Create a new blog post
router.post('/',  postController.create);

// PUT /api/posts/:postId - Update a specific blog post
router.put('/:postId',  postController.update);

// DELETE /api/posts/:postId - Delete a specific blog post
router.delete('/:postId',  postController.remove);

module.exports = router;