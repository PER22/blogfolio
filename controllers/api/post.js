const BlogPost = require('../../models/post');

// Create a new blog post
async function create(req, res) {
  try {
    const { user, project, title, article } = req.body;
    const blogPost = await BlogPost.create({ user, project, title, article });
    res.status(201).json(blogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ error: 'Failed to create blog post' });
  }
}

// Get a blog post by ID
async function getById(req, res) {
  try {
    const blogPost = await BlogPost.findById(req.params.postId).populate('user');
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }else if(blogPost.user._id != req.user._id){
      res.status(404).json({ error: "You don't have access to this post." });}
    else{res.status(200).json(blogPost);}
  } catch (error) {
    console.error('Error getting blog post:', error);
    res.status(400).json({ error: 'Failed to get blog post' });
  }
}

// Update a blog post

async function update(req, res) {
  try {
    const { project, title, article, image } = req.body;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.postId,
      {
        title: title,
        project: project,
        article: article,
        image: image,
      }
    );

    if (!updatedBlogPost) throw new Error('Project not found');

    res.status(200).json(updatedBlogPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

// Delete a blog post
async function remove(req, res) {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.postId);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(400).json({ error: 'Failed to delete blog post' });
  }
}

// Get all blog posts
async function list(req, res) {
  try {
    const blogPosts = await BlogPost.find({user: req.user._id}).populate('user').populate('project');
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error('Error listing blog posts:', error);
    res.status(400).json({ error: 'Failed to get blog posts' });
  }
}

async function starPost(req, res) {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    // Add the user's reference to the post's stars array
    const post = await BlogPost.findByIdAndUpdate(
      postId,
      { $addToSet: { stars: userId }, $inc: { numStars: 1 } },
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    console.error('Error starring post:', error);
    res.status(500).json({ error: 'Failed to star post' });
  }
}

async function unstarPost(req, res) {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    // Remove the user's reference from the post's stars array
    const post = await BlogPost.findByIdAndUpdate(
      postId,
      { $pull: { stars: userId }, $inc: { numStars: -1 } },
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    console.error('Error unstarring post:', error);
    res.status(500).json({ error: 'Failed to unstar post' });
  }
}

module.exports = {
  create,
  getById,
  update,
  remove,
  list,
  starPost,
  unstarPost
};
