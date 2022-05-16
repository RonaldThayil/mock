const userData = require("../../models/userRouter");
const bcrypt = require("bcrypt");
const statusCode = require("../../config/statuscode");
const { response_message } = require("../../helpers/response");
const userService = require("../../services/user");

exports.createAccount = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    console.log("4", result);
    if (!result)
      return response_message({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Error in creating user",
      });
    response_message({ res, ...result });
  } catch (error) {
    response_message({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    console.log("4", result);
    if (!result)
      return response_message({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Error in logging user",
      });
    response_message({ res, ...result });
  } catch (error) {
    response_message({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
};

exports.changepassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(req.body);
    console.log("4", result);
    if (!result)
      return response_message({
        res,
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Error in Changing Password",
      });
    response_message({ res, ...result });
  } catch (error) {
    response_message({
      res,
      statusCode: statusCode.SERVER_ERROR,
      success: 0,
      message: error.message,
    });
  }
};

exports.changepassword = async (req, res, next) => {
  bcrypt.hash(req.body.newPass, 10, (err, hash) => {
    if (err) {
      return response_message({ res, success: false, message: err.message });
    } else {
      userData.findOne({ email: req.user.email }).then((qq) => {
        console.log(qq, "qqqqqqq");
        let aa = qq.password;
        bcrypt.compare(req.body.oldPass, aa).then((resl) => {
          if (resl) {
            userData
              .findByIdAndUpdate(
                { _id: req.user._id },
                { $set: { password: hash } }
              )
              .then((resi) => {
                return response_message({
                  res,
                  success: true,
                  message: "Password Changed",
                  result: resi,
                });
              });
          } else {
            return response_message({ res, message: "Password Incorrect" });
          }
        });
      });
    }
  });
  // res.send("Done");
  // userData.findOne({ email: req.body.email }).then((result) => {
  //   bcrypt;
  // });
};
