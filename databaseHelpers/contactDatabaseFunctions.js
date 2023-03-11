// Author - Sonal Pooja
const contactModel = require('../models/contact');

exports.getContactDetails = (req, res) => {
  const contactDetails = contactModel.getContactDetails();
  res.json(contactDetails);
};
