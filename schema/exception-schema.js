const { query } = require("express-validator");

const exceptionSchema = [
  query("deptId")
    .isLength({ min: 3, max: 3 })
    .withMessage("Illegal value for deptid"),
  query("amount").isNumeric().withMessage("amount must be number"),
  query("planType").isAlpha().withMessage("plan Type must be string"),
];

module.exports = { exceptionSchema };
