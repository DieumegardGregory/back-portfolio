
const projectsRouter = require('express').Router();
const { projectsControllers } = require('../controllers');
const { authControllers } = require('../controllers');
const { multerControllers } = require('../controllers');

projectsRouter.get('/', projectsControllers.findManyProjects);
projectsRouter.get('/:id', projectsControllers.findOneProjectById);
projectsRouter.post('/', authControllers.verifyToken, multerControllers.postImageObj, projectsControllers.createOneProject, projectsControllers.findOneProjectById);
projectsRouter.put('/:id', authControllers.verifyToken, projectsControllers.updateOneProject);
projectsRouter.delete('/:id', authControllers.verifyToken, projectsControllers.deleteOneProject);

module.exports = projectsRouter;


