/**@type {import("../types/user.type.js").User} */
const akhil = {
  name: '',
  email: '',
  password: '',
  avatar: {
    public_id: '',
    url: '',
  },
  role: '',
  isVerified: false,
  courses: [],
  comparePassword: function (password) {
    throw new Error('Function not implemented.');
  },
};
