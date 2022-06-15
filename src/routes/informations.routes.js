const infosRouter = require('express').Router();
const { infosControllers } = require('../controllers');
const { authControllers } = require('../controllers');

infosRouter.get("/", infosControllers.findManyInfos);
infosRouter.get("/:id", infosControllers.findOneInfoById);
infosRouter.post("/", authControllers.verifyToken, infosControllers.createOneInfo, infosControllers.findOneInfoById);
infosRouter.put("/:id", authControllers.verifyToken, infosControllers.updateOneInfo);
infosRouter.delete("/:id", authControllers.verifyToken, infosControllers.deleteOneInfo);

module.exports = infosRouter;