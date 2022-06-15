const usersRouter = require('express').Router();
const { usersControllers } = require('../controllers');

usersRouter.get('/', usersControllers.findManyUsers);
usersRouter.get('/:id', usersControllers.findOneUserById);
usersRouter.post('/', usersControllers.createOneUser, usersControllers.findOneUserById);
usersRouter.put('/:id', usersControllers.updateOneUser, usersControllers.findOneUserById);
usersRouter.delete('/:id', usersControllers.deleteOneUser);

module.exports = usersRouter;