const { validationResult, body } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};
//* ===================== *//
//* ======= USERS ======= *//
//* ===================== *//

exports.createUser = [
  body('name').notEmpty().withMessage('Name field is required'),
  body('email').notEmpty().withMessage('Email field is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.login = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.updateUser = [
  body('email').notEmpty().withMessage('Email is required'),
  body('name').notEmpty().withMessage('Name is required'),
];

//* ===================== *//
//* ====== REPAIRS ====== *//
//* ===================== *//

exports.createRepair = [
  body('motorsNumber').notEmpty().withMessage('MotorsNumber is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('userId').notEmpty().withMessage('UserId is required'),
];

exports.updateRepair = [
  body('status').notEmpty().withMessage('Status is required'),
];
