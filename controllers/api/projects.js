const Project = require('../../models/project');

module.exports = {
  create,
  detail,
  index
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
    res.status(400).json(err);
  }
}

async function detail(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'name email');
    if (!project) throw new Error('Project not found');
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
