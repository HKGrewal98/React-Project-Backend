const orderDB = require("../models/orders").orders;
const paymentDB = require("../models/payment").payment;
const { sendOrderConfirmation } = require("../authenticate/sendEmail");

function saveOrder(data, res) {
  const order = new orderDB();

  const orderStatus = "FALSE",
    paymentStatus = "FALSE";

  order.customerId = data.id;
  order.address = data.address;
  order.totalAmount = data.totalAmount;
  order.isCompleted = data.isCompleted;
  order.order = data.order;

  order.save(function (err, result) {
    if (err) {
      console.log(err);
      return res.json({ error: err });
    }
    sendOrderConfirmation("grewalharkanwal36@gmail.com", data.order);
    orderStatus = "SUCCESS";
  });

  const pay = new paymentDB();
  pay.customerId = data.id;
  pay.cardNumber = data.cardNumber;
  pay.cardExpiry = data.expiry;
  pay.cardCvv = data.cvv;
  pay.amount = data.totalAmount;
  pay.modeOfPayment = data.mode;
  pay.dateOfPayment = data.date;

  pay.save(function (err, result) {
    if (err) {
      console.log(err);
      return res.json({ error: err });
    }
    paymentStatus = "SUCCESS";
  });
  if (paymentStatus === "SUCCESS" && orderStatus === "SUCCESS") {
    res.status(200).json({
      message: "Payment and Order submitted successfully",
    });
  } else {
    res.status(400).json({
      message: "Details entered are not valid!",
    });
  }
}

module.exports = { saveOrder };
