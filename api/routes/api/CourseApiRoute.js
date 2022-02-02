const express = require('express');
const router = express.Router();
const courseApiController = require('../../api/CourseAPI');

router.get('/', courseApiController.getCourses);
router.get('/:course_id', courseApiController.getCourseById);
router.post('/', courseApiController.createCourse);
router.put('/:course_id', courseApiController.updateCourse);
router.delete('/:course_id', courseApiController.deleteCourse);

module.exports = router;