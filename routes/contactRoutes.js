// Author - Sonal Pooja
const express = require('express');

const dbMethods = require('../databaseHelpers/contactDatabaseFunctions');
const contactRouter = express.Router();

contactRouter.get('/', dbMethods.getContactDetails);

module.exports = contactRouter;
