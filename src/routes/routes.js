const router = require("express").Router();
const { routes } = require("../config/constants");
const controller = require("../controllers");
const paperwork = require("paperwork");
const validation = require("../validation");
const { verifyToken } = require("../middleware/auth");
router.get("/ww", (res, req) => {
  req.render("login");
});

router.get("/getdata", (res, req) => {
  req.send("Hello");
});
router.post(
  routes.signUp,
  paperwork.accept(validation.register.registerVal),
  controller.user.createAccount
);
router.post(routes.login, controller.user.userLogin);
router.post(routes.changepassword, verifyToken, controller.user.changepassword);

module.exports = router;
