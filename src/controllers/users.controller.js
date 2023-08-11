const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');

//* Create user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPass = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPass,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'user has been created ',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`user with email: ${email} not found`, 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'succesfully loged in',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      profileImageUrl: user.profileImageUrl,
    },
  });
});

//* Read all users
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'available' },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Users retrieved successfully',
    results: users.length,
    users,
  });
});

//* Read user by id
exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'succes',
    message: 'user retrieved succesfully',
    user,
  });
});

//* Update User
exports.updateUser = catchAsync(async (req, res, next) => {
  const {user} = req
  const { name, email } = req.body;

  //? Update user
  const updatedUser = await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'succes',
    message: 'user updated succesfully',
    user: updatedUser,
  });
});

//* Delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const {user} = req

  //  Soft delete
  await user.update({ status: 'disabled' });

  res.status(200).json({
    message: `User with id: ${id} has been deletd succesfully`,
    id,
  });
});
