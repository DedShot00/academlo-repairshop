const express = require('express');

//* Middleware
const authMiddleware = require('../middlewares/auth.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/user.middleware');

//* controller
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/login', validationsMiddleware.login, usersController.login);

router
  .route('/')
  .get(authMiddleware.protect, usersController.getUsers)
  .post(validationsMiddleware.createUser, usersController.createUser);

router.use(authMiddleware.protect);
router
  .use('/:id', userMiddleware.validUser)
  .route('/:id')
  .get(usersController.getUserById)
  .patch(authMiddleware.protectAccountOwner, validationsMiddleware.updateUser, usersController.updateUser)
  .delete(authMiddleware.protectAccountOwner, usersController.deleteUser);

module.exports = router;
