const routes = {
  check: "getdata",
  signUp: "/signUp",
  login: "/login",
  updateProfile: "updateUserProfile",
  changepassword: "/changepaswword",
};

const products = {
  addProduct: "/addProduct",
  editProduct: "/editProduct",
};

const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneNumber: /^[0-9]{10,15}$/,
  firstName: /^.{1,50}$/,
  lastName: /^.{1,50}$/,
  password: /^.{8,}$/,
  clinicName: /^.{1,30}$/,
  newPassword: /^.{8,}$/,
  notNull: /^(?!\s*$).+/,
  queston: /^.{1,200}$/,
  answer: /^.{1,300}$/,
};

module.exports = { routes, products, regex };
