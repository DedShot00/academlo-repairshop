const Repair = require("../models/repair.model");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validRepair = catchAsync( async (req, res, next) => { 
  const {id} = req.params

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending'
    },
    include:[
      {
        model: User,
        attributes:['id', 'name', 'email']
      }
    ]
  })

  if (!repair) {
    return next(new AppError(`repair with id ${id} not found`,404))
  }

  req.repair = repair
  next()
})