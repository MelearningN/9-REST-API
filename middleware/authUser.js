'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next) => {
  let message;

  const credentials = auth(req);
  if (credentials && credentials.name && credentials.pass) {
    const user = await User.findOne({ where: {emailAddress: credentials.name} });
    if (user) {
      const authenticated = bcrypt
        .compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.firstName,user.lastName}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Password doesn't match for user: ${user.firstName,user.lastName}`;
      }
    } else {
      message = `User not found this given email: ${credentials.name}`;
    }
  } else {
    message = 'Please use appropriate creditionals';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: message || 'Access Denied' });
  } else {
    next();
  }
};