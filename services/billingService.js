const axios = require("axios");

function billingService(deptId, amount) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.BILLING_API}/${deptId}`)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

module.exports = billingService;
