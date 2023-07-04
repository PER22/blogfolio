const User = require('../../models/user')
const BlogPost = require('../../models/post');

// Get all blog posts
async function allPosts(req, res) {
  try {
    const blogPosts = await BlogPost.find().populate('user').populate('project');
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error('Error listing blog posts:', error);
    res.status(400).json({ error: 'Failed to get blog posts' });
  }
}

// Create a new blog post
async function createPost(req, res) {
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
async function getPostById(req, res) {
  try {
    const blogPost = await BlogPost.findById(req.params.postId).populate('user');
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    else{res.status(200).json(blogPost);}
  } catch (error) {
    res.status(400).json({ error: 'Failed to get blog post.' });
  }
}

// Update a blog post
async function updatePost(req, res) {
  try {
    const { project, title, article, image } = req.body;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.postId,
      {
        title: title,
        project: project,
        article: article,
        image: image,
      },
      { new: true }
    );
    if (!updatedBlogPost) throw new Error('Project not found');
    res.status(200).json(updatedBlogPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

// Delete a blog post
async function removePost(req, res) {
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

// Get all blog posts by a specified user
async function postsBy(req, res) {
  try {
    const foundUser = await User.findOne({username: req.params.username});
    if(!foundUser){
      return res.status(404).json({error: 'User not found.'});
    }
    const blogPostsBySpecifiedUser = await BlogPost.find({user: foundUser._id}).populate('user').populate('project');
    res.status(200).json(blogPostsBySpecifiedUser);
  } catch (err) {
    console.error('Error listing blog posts:', error);
    res.status(400).json({ error: `Failed to get blog posts: ${err}` });
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
  allPosts,
  createPost,
  getPostById,
  updatePost,
  removePost,
  postsBy,
  starPost,
  unstarPost
};


