const formationsRouter = require('express').Router();
const { formationsControllers } = require('../controllers');
const { authControllers } = require('../controllers');

formationsRouter.get("/", formationsControllers.findManyFormations);
formationsRouter.get("/:id", formationsControllers.findOneFormationById);
formationsRouter.post("/", authControllers.verifyToken, formationsControllers.createOneFormation, formationsControllers.findOneFormationById);
formationsRouter.put("/:id", authControllers.verifyToken, formationsControllers.updateOneFormation);
formationsRouter.delete("/:id", authControllers.verifyToken, formationsControllers.deleteOneFormation);

module.exports = formationsRouter;