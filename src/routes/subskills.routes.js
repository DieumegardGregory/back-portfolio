const subskillsRouter = require('express').Router();
const { subskillsControllers } = require('../controllers');
const { authControllers } = require('../controllers');

subskillsRouter.get("/", subskillsControllers.findManySubskills);
subskillsRouter.get("/:id", subskillsControllers.findOneSubskillById);
subskillsRouter.get("/linked/:id", subskillsControllers.findSubskillsLinkedToHardskill);
subskillsRouter.post("/", authControllers.verifyToken, subskillsControllers.createOneSubskill, subskillsControllers.findOneSubskillById);
subskillsRouter.put("/:id", authControllers.verifyToken, subskillsControllers.updateOneSubskill);
subskillsRouter.delete("/:id", authControllers.verifyToken, subskillsControllers.deleteOneSubskill);

module.exports = subskillsRouter;