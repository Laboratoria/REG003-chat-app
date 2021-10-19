const axios = require('axios');

const Path_User = 'http://localhost:3000/api/user';

export const createUser = async (request) => {
  try {
    const response = await axios.post(Path_User, request);
    return response.statusText;
  } catch (error) {
    return error.response.statusText;
  }
};
