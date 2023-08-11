const express = require('express');

//* Middleware
const authMiddleware = require('../middlewares/auth.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');
const repairsMiddleware = require('../middlewares/repair.middleware')
//* Controllers
const repairsController = require('../controllers/repairs.controller');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairsController.getRepairs)
  .post(validationsMiddleware.createRepair, repairsController.createRepair);

router.use(authMiddleware.restrictTo('employee'));

router
  .use('/:id', repairsMiddleware.validRepair)
  .route('/:id')
  .get(repairsController.getRepairById)
  .patch(validationsMiddleware.updateRepair, repairsController.updateRepair)
  .delete(repairsController.deleteRepair);

module.exports = router;
