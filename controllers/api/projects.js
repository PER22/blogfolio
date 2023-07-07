
const Project = require('../../models/project');
const User = require('../../models/user');
const Post = require('../../models/post')

module.exports = {
  allProjects,
  createProject,
  getProjectById,
  projectsBy,
  updateProject,
  deleteProject,
  starProject,
  unstarProject
};

async function allProjects(req, res) {
  try {
    const all_projects = await Project.find().populate('user');
    res.status(200).json(all_projects);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}


async function createProject(req, res) {
  try {
    // Add the project to the db
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      user: req.user._id
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.projectId).populate('user', 'name email');
    if (!project) throw new Error('Project not found');
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function projectsBy(req, res) {
  try {
    const foundUser = await User.findOne({ username: req.params.username });
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const projectsByUsername = await Project.find({ user: foundUser._id }).populate('user');
    res.status(200).json(projectsByUsername);
  } catch (err) {
    console.error('Error listing projects: ', err);
    res.status(400).json({ error: `Failed to get projects: ${err}` });
  }
}

async function updateProject(req, res) {
  try {
    const projectFound = await Project.findById(req.params.projectId).populate('user');
    if (!projectFound) {
      return res.status(404).json({error: "Project not found."})
    }
    if (projectFound.user._id != req.user._id) {
      return res.status(403).json({error: "You don't have write access to this resource."});
    }
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function deleteProject(req, res) {
  try {
    const foundProject = await Project.findById(req.params.projectId).populate('user');
    if (!foundProject){
      return res.status(404).json({error: "Project not found."});
    }
    if(foundProject.user._id != req.user._id){
      return res.status(403).json({error: "You don't have write access to this resource."});
    }
    await Post.deleteMany({ project: req.params.projectId });
    await Project.findByIdAndDelete(req.params.projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function starProject(req, res) {
  try {
    const projectId = req.params.projectId;
    const userId = req.user._id;
    await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { stars: userId }},
      { new: true }
    );
    const project = await Project.findById(projectId);
    const numStars = project.stars.length;
    await Project.findByIdAndUpdate(
      projectId,
      { $set: { numStars } },
      { new: true }
    );
    res.status(200).json(project);
  } catch (error) {
    console.error('Error starring project:', error);
    res.status(500).json({ error: 'Failed to star project' });
  }
}

async function unstarProject(req, res) {
  try {
    const projectId = req.params.projectId;
    const userId = req.user._id;    
    await Project.findByIdAndUpdate(
      projectId,
      { $pull: { stars: userId } },
      { new: true }
    ); 
    const project = await Project.findById(projectId);
    const numStars = project.stars.length; 
    await Project.findByIdAndUpdate(
      projectId,
      { $set: { numStars } },
      { new: true }
    ); 
    res.status(200).json(project);
  } catch (error) {
    console.error('Error unstarring project:', error);
    res.status(500).json({ error: 'Failed to unstar project' });
  }
}

