const Project = require('../../models/project');

module.exports = {
  create,
  detail,
  index,
  update,
  delete: deleteProject
};

async function create(req, res) {
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

async function detail(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'name email');
    if (!project) throw new Error('Project not found');
    res.status(200).json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
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
    const deletedProject = await Project.findByIdAndRemove(req.params.id);

    if (!deletedProject) throw new Error('Project not found');

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
}
