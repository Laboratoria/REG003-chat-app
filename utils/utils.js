module.exports = {
  isAValidEmail: (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
  },
};
