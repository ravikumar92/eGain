const express = require("express");
const router = express.Router();
const {
  billingService,
  customerService,
  exceptionService,
} = require("../services");
const { exceptionSchema } = require("../schema/exception-schema");
const { validateQuerySchema } = require("../middleware/validator");

router.get(
  "/exceptions",
  exceptionSchema,
  validateQuerySchema,
  async function (req, res) {
    try {
      const { deptId, amount, planType } = req.query;
      const [billing, customer] = await Promise.all([
        billingService(deptId, amount),
        customerService(planType),
      ]);

      if (billing.data.status === "error") {
        return res.status(400).send({
          status: "error",
          message: billing.data.message,
        });
      } else if (customer.data.status === "error") {
        return res.status(400).send({
          status: "error",
          message: customer.data.message,
        });
      } else {
        const list = exceptionService([billing.data.data, customer.data.data], {
          deptId,
          amount,
          planType,
        });

        res.status(200).send({
          status: "sucess",
          data: list,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(400).send("something went worng");
    }
  }
);

module.exports = router;
