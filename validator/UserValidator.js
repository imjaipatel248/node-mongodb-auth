const { body, validationResult } = require("express-validator");

const userSignUpValidationRules = () => {
  return [
    body("email")
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .withMessage("Please enter valid email"),
    body("name").notEmpty().withMessage("Please enter valid name"),

    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must contains atleast 6 characters"),
  ];
};

const userSignInValidationRules = () => {
  return [
    body("email")
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .withMessage("Please enter valid email"),
    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must contains atleast 6 characters"),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userSignInValidationRules,
  userSignUpValidationRules,
  validate,
};
