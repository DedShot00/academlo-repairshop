const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//* Create repair
exports.createRepair = catchAsync(async (req, res) => {
  const { motorsNumber, userId, description } = req.body;

  const repair = await Repair.create({
    date: new Date(),
    userId,
    motorsNumber,
    description,
  });

  res.status(200).json({
    status: 'success',
    message: "you've succesfully created a repair!",
  });
});

//* Read all repairs
exports.getRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    message: "you've made a succesful get petition",
    results: repairs.length,
    repairs,
  });
});

//* Read by id
exports.getRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    status: 'succes',
    message: 'repair retrieved succesfully',
    repair,
  });
});

//* Update repair
exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  const { status } = req.body;

  //? Update repair
  const updatedRepair = await repair.update({
    status,
  });

  res.status(200).json({
    status: 'succes',
    message: 'repair updated succesfully',
    repair: updatedRepair,
  });
});

//* Delete a repair
exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  //  Soft delete
  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    message: `Repair with id: ${repair.id} has been cancelled succesfully`,
    
  });
});
