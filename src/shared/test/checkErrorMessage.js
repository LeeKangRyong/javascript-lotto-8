const checkErrorMessage = (errorMessage) => {
  return new RegExp(`^\\[ERROR\\] ${errorMessage}$`);
};

export { checkErrorMessage };
