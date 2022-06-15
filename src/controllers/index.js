const projectsControllers = require('./projects.controllers');
const usersControllers = require('./users.controllers');
const multerControllers = require('./multer.controllers');
const authControllers = require('./auth.controllers');
const experiencesControllers = require('./experiences.controllers');
const formationsControllers = require('./formations.controllers');
const hardskillsControllers = require('./hardskills.controllers');
const softskillsControllers = require('./softskills.controllers');
const tasksControllers = require('./tasks.controllers');
const subskillsControllers = require('./subskills.controllers');
const infosControllers = require('./informations.controllers');

module.exports = {
  projectsControllers,
  usersControllers,
  multerControllers,
  authControllers,
  experiencesControllers,
  formationsControllers,
  hardskillsControllers,
  softskillsControllers,
  tasksControllers,
  subskillsControllers,
  infosControllers,
}