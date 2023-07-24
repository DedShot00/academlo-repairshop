const Repair = require("../models/repair.model");

//* Create repair
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const repair = await Repair.create({
      date,
      userId,
    });

    res.status(200).json({
      status: "success",
      message: "you've succesfully created a repair!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
      error,
    });
  }
};

//* Read all repairs
exports.getRepairs = async (req, res) => {
  Repair;
  try {
    const repairs = await Repair.findAll({
      where: { status: "pending" },
    });

    return res.status(200).json({
      status: "success",
      message: "you've made a succesful get petition",
      results: repairs.length,
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
      error,
    });
  }
};

//* Read by id
exports.getRepairById = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `repair with id: ${id} not found`,
      });
    }

    res.status(200).json({
      status: "succes",
      message: "repair retrieved succesfully",
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
      error,
    });
  }
};

//* Update repair
exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //? retrieve repair
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    //? validate active repair
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `repair with id ${id} not found`,
      });
    }

    //? Update repair
    const updatedRepair = await repair.update({
      status,
    });

    res.status(200).json({
      status: "succes",
      message: "repair updated succesfully",
      repair: updatedRepair,
    });
  } catch (error) {
    //? send error if something goes wrong
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
      error,
    });
  }
};

//* Delete a repair
exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const completedRepair = await Repair.findOne({
      where: {
        id,
        status: 'completed'
      }
    })

    if (completedRepair) {
      return res.status(404).json({
        status: "error",
        message: `repair with id ${id} is already completed`,
      });
    }



    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `repair with id ${id} doesn't exist`,
      });
    }

    //  Soft delete
    await repair.update({ status: "cancelled" });

    res.status(200).json({
      message: `Repair with id: ${id} has been cancelled succesfully`,
      id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "internal server error",
      error,
    });
  }
};
