'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
const {authenticateUser} = require('../middleware/authUser');
const {asyncHandler} = require('../utility')
const {errorHandler} = require('../utility')

// fetch all the courses
router.get('/', asyncHandler(async (req, res) => {
    let courses = await Course.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'estimatedTime',
            'materialsNeeded',
            'userId'
        ]
    });
    res.status(200).json(courses);
}));

// fetch a specific course
router.get('/:id', asyncHandler(async (req, res) => {
    let courseId = req.params.id
    const course = await Course.findByPk(courseId);
    try {
        if (course) {
            Course.findAll({
                attributes: [
                    'id',
                    'title',
                    'description',
                    'estimatedTime',
                    'materialsNeeded',
                    'userId'
                ],
                where: {
                    id: courseId
                }
            });
            res.status(200).json(course);
        } else {
            res.status(400).end()
        }
    } catch (error) {
        errorHandler(error, res)
    }
}));

// add a course with authentication
router.post('/', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).location(`/courses/${
            course.id
        }`).end()
    } catch (error) {
        errorHandler(error, res)
    }
}));

// updates the course with authentication
router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
    let courseId = req.params.id
    const user = req.currentUser;
    const course = await Course.findByPk(courseId);
    try {
        if (course) {
            if (user.id == course.userId) {
                await Course.update(req.body, {
                    where: {
                        id: courseId
                    }
                });
                res.status(204).end();
            } else 
                res.status(403).end();
            
        } else {
            res.status(400).end()
        }
    } catch (error) {
        errorHandler(error, res)
    }
}));

// deletes a course with authentication
router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
    let courseId = req.params.id
    const user = req.currentUser;
    const course = await Course.findByPk(courseId);
    try {
        if (course) {
            if (user.id == course.userId) {
                await Course.destroy({
                    where: {
                        id: courseId
                    }
                });
                res.status(204).end()
            } else 
                res.status(403).end();
            
        } else {
            res.status(400).end()
        }
    } catch (error) {
        errorHandler(error, res)
    }
}));


module.exports = router;
