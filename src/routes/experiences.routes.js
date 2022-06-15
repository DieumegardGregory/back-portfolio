const experiencesRouter = require('express').Router();
const { experiencesControllers } = require('../controllers');
const { authControllers } = require('../controllers');

experiencesRouter.get("/", experiencesControllers.findManyExperiences);
experiencesRouter.get("/:id", experiencesControllers.findOneExperienceById);
experiencesRouter.post("/", authControllers.verifyToken, experiencesControllers.createOneExperience, experiencesControllers.findOneExperienceById);
experiencesRouter.put("/:id", authControllers.verifyToken, experiencesControllers.updateOneExperience);
experiencesRouter.delete("/:id", authControllers.verifyToken, experiencesControllers.deleteOneExperience);


module.exports = experiencesRouter;