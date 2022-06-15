const mainRouter = require('express').Router();
const projectsRouter = require('./projects.routes');
const usersRouter = require('./users.routes');
const experiencesRouter = require('./experiences.routes');
const formationsRouter = require('./formations.routes');
const hardskillsRouter = require('./hardskills.routes');
const softskillsRouter = require('./softskills.routes');
const subskillsRouter = require('./subskills.routes');
const tasksRouter = require('./tasks.routes');
const authRouter = require('./auth.routes');
const infosRouter = require('./informations.routes');

mainRouter.use('/projects', projectsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/experiences', experiencesRouter);
mainRouter.use('/formations', formationsRouter);
mainRouter.use('/hardskills', hardskillsRouter);
mainRouter.use('/softskills', softskillsRouter);
mainRouter.use('/subskills', subskillsRouter);
mainRouter.use('/tasks', tasksRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/informations', infosRouter);

module.exports = mainRouter;