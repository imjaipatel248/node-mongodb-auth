const { signup, signin, signout } = require("../controller/auth");
const express = require("express");
const router = express.Router();
const {
  userSignInValidationRules,
  userSignUpValidationRules,
  validate,
} = require("../validator/UserValidator");

router.post("/signup", userSignUpValidationRules(), validate, signup);
router.post("/signin", userSignInValidationRules(), validate, signin);
router.post("/signout", signout);
module.exports = router;
