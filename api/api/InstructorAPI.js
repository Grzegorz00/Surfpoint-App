const InstructorRepository = require('../repository/sequelize/InstructorRepository');
const authUtil = require('../util/authUtils');

exports.getInstructors = (req,res,next) => {
    InstructorRepository.getInstructors()
        .then(instructors => {
            res.status(200).json(instructors);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getInstructorById = (req,res,next) => {
    const instructor_id = req.params.instructor_id;

    InstructorRepository.getInstructorById(instructor_id)
        .then(instructor => {
            if(!instructor){
                res.status(400).json({
                    message: 'Instructor with id: ' + instructor_id + ' not found'
                });
            } else {
                res.status(200).json(instructor);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.createInstructor = (req,res,next) => {
    const instructorData = { ...req.body };
    instructorData.password = authUtil.hashPassword(instructorData.password);

    InstructorRepository.createInstructor(instructorData)
        .then(newObj => {
            res.status(200).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateInstructor = (req,res,next) => {
    const instructor_id = req.params.instructor_id;

    InstructorRepository.updateInstructor(instructor_id, req.body)
        .then(result => {
            res.status(200).json({message: 'Instructor updated!', instructor: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteInstructor = (req,res,next) => {
    const instructor_id = req.params.instructor_id;

    InstructorRepository.deleteInstructor(instructor_id, req.body)
        .then( result => {
            res.status(200).json({message: 'Removed instructor!', instructor: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}