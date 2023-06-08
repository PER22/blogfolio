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
    const blogPost = await BlogPost.findById(req.params.id).populate('user');
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }else if(blogPost.user != req.user._id){
    res.status(404).json({ error: "You don't have access to this post" });}
    else{res.status(200).json(blogPost);}
  } catch (error) {
    console.error('Error getting blog post:', error);
    res.status(400).json({ error: 'Failed to get blog post' });
  }
}

// Update a blog post
async function update(req, res) {
  try {
    const { title } = req.body;
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ error: 'Failed to update blog post' });
  }
}

// Delete a blog post
async function remove(req, res) {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
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

module.exports = {
  create,
  getById,
  update,
  remove,
  list
};
