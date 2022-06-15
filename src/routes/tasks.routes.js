const tasksRouter = require('express').Router();
const { tasksControllers } = require('../controllers');
const { authControllers } = require('../controllers');

tasksRouter.get("/", tasksControllers.findManyTasks);
tasksRouter.get("/:id", tasksControllers.findOneTaskById);
tasksRouter.get("/linked/:id", tasksControllers.findTasksLinkedToExperience);
tasksRouter.post("/", authControllers.verifyToken, tasksControllers.createOneTask, tasksControllers.findOneTaskById);
tasksRouter.put("/:id", authControllers.verifyToken, tasksControllers.updateOneTask);
tasksRouter.delete("/:id", authControllers.verifyToken, tasksControllers.deleteOneTask);

module.exports = tasksRouter;