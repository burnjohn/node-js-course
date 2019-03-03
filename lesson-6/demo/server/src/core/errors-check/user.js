
const NO_PASSWORD_MESSAGE = 'No user password';
const NO_NAME_MESSAGE = 'No user name';

const userErrorsChecker = (userInput) => {
  const errorMessageList = [];

  if (!userInput.password) {
    errorMessageList.push(NO_PASSWORD_MESSAGE)
  }

  if (!userInput.name) {
    errorMessageList.push(NO_NAME_MESSAGE)
  }

  return errorMessageList;
};

export default userErrorsChecker;
