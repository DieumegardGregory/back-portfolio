const hardskillsRouter = require('express').Router();
const { hardskillsControllers } = require('../controllers');
const { authControllers } = require('../controllers');

hardskillsRouter.get("/", hardskillsControllers.findManyHardskills);
hardskillsRouter.get("/:id", hardskillsControllers.findOneHardskillById);
hardskillsRouter.post("/", authControllers.verifyToken, hardskillsControllers.createOneHardskill, hardskillsControllers.findOneHardskillById);
hardskillsRouter.put("/:id", authControllers.verifyToken, hardskillsControllers.updateOneHardskill);
hardskillsRouter.delete("/:id", authControllers.verifyToken, hardskillsControllers.deleteOneHardskill);

module.exports = hardskillsRouter;