const authRouter = require('express').Router();
const { usersControllers } = require('../controllers');
const { authControllers } = require('../controllers');

authRouter.get("/", authControllers.verifyToken, usersControllers.findOneUserById)
authRouter.post("/login", authControllers.verifyCredentials, authControllers.createToken);
authRouter.post("/refreshToken", authControllers.verifyToken, authControllers.refreshToken);

module.exports = authRouter;