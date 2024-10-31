const express = require('express');
const router = express.Router();
const teacherController = require('./teacherController');

router.post('/create', teacherController.createTeacher);
router.get('/', teacherController.getAllteachers);
router.get('/:id', teacherController.getTeacherById);
router.put('/:id', teacherController.updateTeacher)
router.delete('/:id', teacherController.deleteTeacher)
router.patch('/:id/toggle', teacherController.toggleTeacherStatus);
//new
module.exports = router;
