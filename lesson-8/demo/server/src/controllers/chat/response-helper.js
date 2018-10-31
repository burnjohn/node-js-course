const sendError = (respondFunc, error) => {
  console.error(error);
  respondFunc && respondFunc({
    status: 'error',
    errorText: error
  });
};

const sendSuccess = (respondFunc, data) => {
  respondFunc && respondFunc({
    status: 'success',
    data
  });
};

module.exports = {
  sendError,
  sendSuccess
};
