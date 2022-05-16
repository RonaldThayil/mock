const jsonwebtoken = require("jsonwebtoken");
const UserData = require("../models/userRouter");
const statusCode = require("../config/statuscode");
const { response_message } = require("../helpers/response");
module.exports.verifyToken = async (req, res, next) => {
  const secret = process.env.SECRET || 10;
  let token = req.headers["x-access-token"] || req.headers.authorization;

  if (token) {
    token = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
  } else {
    return response_message({
      res,
      statusCode: statusCode.UNAUTHORIZED,
      success: 0,
      message: "Your session has expired",
    });
  }
  jsonwebtoken.verify(token, secret, async (err, decoded) => {
    if (!decoded || err) {
      return response_message({
        res,
        statusCode: statusCode.UNAUTHORIZED,
        success: 0,
        message: "Your session has expired",
      });
    }
    const users = UserData.findById(verify.userId);
    if (!users)
      return response_message({
        res,
        statusCode: statusCode.UNAUTHORIZED,
        success: 0,
        message: "Your session has expired",
      });
    delete users?.dataValues?.password;
    req.user = users;
    next();
  });
};
