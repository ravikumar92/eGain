function exceptionService(data, query) {
  const [billing, customer] = data;
  const { deptId, amount, planType } = query;
  const sucessResponse = {
    exceptions: [],
    missing: [],
  };
  for (id in customer) {
    if (customer[id] === planType && billing[id] > amount) {
      sucessResponse.exceptions.push(id);
    }
  }
  const billingIds = Object.keys(billing);
  const customerIds = Object.keys(customer);
  let currentBill = 0;
  let currentCustomer = 0;

  while (
    currentBill < billingIds.length &&
    currentCustomer < customerIds.length &&
    currentBill == currentCustomer
  ) {
    if (billingIds[currentBill] !== customerIds[currentCustomer]) {
      sucessResponse.missing.push(billingIds[currentBill]);
    }
    currentBill++;
    currentCustomer++;
  }

  if (currentBill < billingIds.length) {
    while (currentBill < billingIds.length) {
      sucessResponse.missing.push(billingIds[currentBill]);
      currentBill++;
    }
  }
  return sucessResponse;
}

module.exports = exceptionService;
