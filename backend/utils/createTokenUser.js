const createTokenUser = (user, accessToken) => {
  return { name: user.name, _id: user._id, role: user.role, accessToken };
};

module.exports = createTokenUser;
