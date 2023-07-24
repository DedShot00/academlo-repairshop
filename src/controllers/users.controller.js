const User = require("../models/user.model");

//* Create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(200).json({
      status: "success",
      message: "you've succesfully created a user!",
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

//* Read all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: "available" },
    });

    return res.status(200).json({
      status: "success",
      message: "you've made a succesful get petition",
      results: users.length,
      users,
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

//* Read user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user with id: ${id} not found`,
      });
    }

    res.status(200).json({
      status: "succes",
      message: "user retrieved succesfully",
      user,
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

//* Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    //? retrieve user
    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });

    //? validate active user
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user with id ${id} not found`,
      });
    }

    //? Update user
    const updatedUser = await user.update({
      name,
      email,
    });

    res.status(200).json({
      status: "succes",
      message: "user updated succesfully",
      user: updatedUser,
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

//TODO Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `user with id ${id} not found`,
      });
    }

    //  Soft delete
    await user.update({ status: "disabled" });

    res.status(200).json({
      message: `User with id: ${id} has been deletd succesfully`,
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
