const userData = require("../models/userRouter");
const statusCode = require("../config/statuscode");
const { response_message } = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (body) => {
  const { firstName, email, password } = body;
  // if (!(firstName && email && password)) {
  //   return {
  //     statusCode: statusCode.SERVER_ERROR,
  //     success: 0,
  //     message: "Please fill all the required fields!",
  //   };
  // }
  console.log("1");
  const existingEmail = await userData.find({ email: email });
  console.log(existingEmail, "existingEmail");
  if (existingEmail.length != 0)
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: "User already exists!",
    };
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await new userData({
    firstName: firstName,
    email: email,
    password: hashedPassword,
  }).save();
  return {
    statusCode: statusCode.SUCCESS,
    success: 1,
    message: "User registered successfully!",
    result: result,
  };
};

exports.login = async (body) => {
  const { email, password } = body;
  const existingUser = await userData.find({ email: email });
  if (existingUser.length == 0) {
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: "User Doesnt Exist",
    };
  } else {
    const loginPassword = await bcrypt.compare(
      body.password,
      existingUser[0].password
    );
    console.log("loginPassword", loginPassword);
    if (loginPassword) {
      let token = jwt.sign(
        {
          email: existingUser[0].email,
          name: existingUser[0].firstName,
          provider: existingUser[0].provider,
        },
        "hhhhh",
        { expiresIn: "24h" }
      );

      let user_data = {
        email: existingUser[0].email,
        name: existingUser[0].firstName,
        token: token,
      };
      return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: "User registered successfully!",
        result: user_data,
      };
    } else {
      return {
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Password Doesn't Match",
      };
    }
  }
};

exports.changePassword = async (body) => {
  const { password, newpassword, user } = body;
  const hashedPassword = await bcrypt.hash(newpassword, 10);
  if (hashedPassword) {
    const result = await userData.findOne({ email: user.email });
    if (result) {
    }
  }

  const { email, password } = body;
  const existingUser = await userData.find({ email: email });
  if (existingUser.length == 0) {
    return {
      statusCode: statusCode.BADREQUEST,
      success: 0,
      message: "User Doesnt Exist",
    };
  } else {
    const loginPassword = await bcrypt.compare(
      body.password,
      existingUser[0].password
    );
    console.log("loginPassword", loginPassword);
    if (loginPassword) {
      let token = jwt.sign(
        {
          email: existingUser[0].email,
          name: existingUser[0].firstName,
          provider: existingUser[0].provider,
        },
        "hhhhh",
        { expiresIn: "24h" }
      );

      let user_data = {
        email: existingUser[0].email,
        name: existingUser[0].firstName,
        token: token,
      };
      return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        message: "User registered successfully!",
        result: user_data,
      };
    } else {
      return {
        statusCode: statusCode.BADREQUEST,
        success: 0,
        message: "Password Doesn't Match",
      };
    }
  }
};
