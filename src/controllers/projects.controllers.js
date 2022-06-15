const { Project } = require('../models');

const findManyProjects = async (_req, res) => {
  try {
    const [results] = await Project.findMany();
    if (results.length === 0) {
      res.status(200).send('Aucun projet disponible');
    } else {
      res.status(200).json(results)
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const findOneProjectById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  if (Number.isNaN(parseInt(id, 10))) {
    res.status(400).send('Vous devez renseigner une ID valide');
  } 
    try {
      const [results] = await Project.findOne(id);
      if (results.length === 0) {
      res.status(400).send(`Le projet avec l'id ${id} n'a pas été trouvé!`);
    } else {
      res.status(statusCode).json(results[0]);
    } 
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
}

const createOneProject = async (req, res, next) => {
  const projectForm = JSON.parse(JSON.stringify(req.body));
  const { name_project, description_project } = projectForm;
  const imgUrl_project = req.file ? req.file.filename : null;
    
  try {
    const [result] = await Project.createOne({ name_project, imgUrl_project, description_project });
    req.id = result.insertId;
    if (result.affectedRows === 0) {
      res.status(400).send('La requête a échouée');
    } else {
      next();
    }
  } catch (err) {
  res.status(500).send(err.message);
  }
}

const updateOneProject = async (req, res) => {
  const { id } = req.params;
  const projectForm = JSON.parse(JSON.stringify(req.body));
  const { name_project, description_project } = projectForm;
  let newProject = {};
  if (name_project) {
    newProject.name_project = name_project;
  }
  if (req.file) {
    newProject.imgUrl_project = req.file.filename;
  }
  if (description_project) {
    newProject.description_project = description_project;
  }
  try {
    const [result] = await Project.updateOne(id, newProject);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      const [updatedProject] = await Project.findOne(id);
      res.status(200).json(updatedProject[0]);
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
};

const deleteOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Project.deleteOne(id);
    if (results.affectedRows > 0) {
      res.status(204).send('Projet effacé avec succès');
    } else {
      res.status(404).send(`Le Projet avec l'id ${id} n'a pas été trouvé`)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  findManyProjects,
  findOneProjectById,
  createOneProject,
  updateOneProject,
  deleteOneProject,
}