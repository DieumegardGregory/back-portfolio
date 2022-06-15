const softskillsRouter = require('express').Router();
const { softskillsControllers } = require('../controllers');
const { authControllers } = require('../controllers');

softskillsRouter.get("/", softskillsControllers.findManySoftskills);
softskillsRouter.get("/:id", softskillsControllers.findOneSoftskillById);
softskillsRouter.post("/", authControllers.verifyToken, softskillsControllers.createOneSoftskill, softskillsControllers.findOneSoftskillById);
softskillsRouter.put("/:id", authControllers.verifyToken, softskillsControllers.updateOneSoftskill);
softskillsRouter.delete("/:id", authControllers.verifyToken, softskillsControllers.deleteOneSoftskill);

module.exports = softskillsRouter;