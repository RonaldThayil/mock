exports.response_message = ({
  res,
  statusCode,
  success,
  message,
  result,
  error,
}) => {
  const resultObj = {
    success: success,
    message: message,
    result: result,
    error: error,
  };
  return res.status(statusCode).send(resultObj);
};
