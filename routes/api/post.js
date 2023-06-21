const express = require('express');
const router = express.Router();
const postController = require('../../controllers/api/post');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/posts - Get all blog posts
router.get('/', postController.allPosts);

//GET /api/posts/by/:profileID
router.get('/by/:userId', postController.postsBy);

// GET /api/posts/:postId - Get a specific blog post
router.get('/:postId',  postController.getPostById);

// POST /api/posts - Create a new blog post
router.post('/',  ensureLoggedIn, postController.createPost);

// PUT /api/posts/:postId - Update a specific blog post
router.put('/:postId',  ensureLoggedIn, postController.updatePost);

// DELETE /api/posts/:postId - Delete a specific blog post
router.delete('/:postId',  ensureLoggedIn, postController.removePost);

router.post('/:postId/star', ensureLoggedIn, postController.starPost);

router.delete('/:postId/star', ensureLoggedIn, postController.unstarPost);

module.exports = router;