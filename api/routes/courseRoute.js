const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.showCourseList);
router.get('/add', courseController.showAddCourseForm);
router.post('/add', courseController.addCourse);
router.get('/details/:course_id', courseController.showCourseDetails);
router.get('/edit/:course_id', courseController.showCourseEditForm);
router.post('/edit', courseController.updateCourse);
router.get('/delete/:course_id', courseController.deleteCourse);

module.exports = router;