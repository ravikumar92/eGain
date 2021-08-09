const axios = require("axios");

function customerService(planType) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.CUSTOMER_API}/`)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

module.exports = customerService;
