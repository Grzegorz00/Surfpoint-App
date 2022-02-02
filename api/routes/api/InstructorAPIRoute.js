const express = require('express');
const router = express.Router();
const instructorApiController = require('../../api/InstructorAPI');
const isAuth = require('../../middleware/isAuth');


router.get('/', instructorApiController.getInstructors);
router.get('/:instructor_id', instructorApiController.getInstructorById);
router.post('/', instructorApiController.createInstructor);
router.put('/:instructor_id', isAuth, instructorApiController.updateInstructor);
router.delete('/:instructor_id', isAuth, instructorApiController.deleteInstructor);

module.exports = router;