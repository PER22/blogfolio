
const Project = require('../../models/project');
const User = require('../../models/user');

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
    const all_projects = await Project.find();
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
    const foundUser = await User.findOne({username: req.params.username});
    if(!foundUser){
      return res.status(404).json({error: 'User not found.'});
    }
    const projectsByUsername = await Project.find({user: foundUser._id}).populate('user');
    res.status(200).json(projectsByUsername);
  } catch (err) {
    console.error('Error listing projects: ', err);
    res.status(400).json({ error: `Failed to get projects: ${err}` });
  }
}

async function updateProject(req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
      },
      { new: true }
    );

    if (!updatedProject) throw new Error('Project not found');

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.projectId);

    if (!deletedProject) throw new Error('Project not found');

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

    // Add the user's reference to the project's stars array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { stars: userId }, $inc: { numStars: 1 } },
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

    // Remove the user's reference from the project's stars array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { stars: userId }, $inc: { numStars: -1 } },
      { new: true }
    );

    res.status(200).json(project);
  } catch (error) {
    console.error('Error unstarring project:', error);
    res.status(500).json({ error: 'Failed to unstar project' });
  }
}

