const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

router.get('/', instructorController.showInstructorList);
router.get('/add', instructorController.showAddInstructorForm);
router.post('/add', instructorController.addInstructor);
router.get('/details/:instructor_id', instructorController.showInstructorDetails);
router.get('/edit/:instructor_id', instructorController.showInstructorEditForm);
router.post('/edit', instructorController.updateInstructor);
router.get('/delete/:instructor_id', instructorController.deleteInstructor);

module.exports = router;