'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models').User;
const {authenticateUser} = require('../middleware/authUser');
const {asyncHandler} = require('../utility')
const {errorHandler} = require('../utility')


// fetch current logged in user
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
    const requestedUser = req.currentUser;
    try {
        const user = await User.findAll({
            attributes: [
                'id', 'firstName', 'lastName', 'emailAddress'
            ],
            where: {
                id: requestedUser.id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        errorHandler(error, res)
    }
}));

// adds a new user
router.post('/', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        errorHandler(error, res)
    }
}));


module.exports = router;
