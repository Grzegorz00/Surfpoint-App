const CourseRepository = require('../repository/sequelize/CourseRepository');

exports.getCourses = (req,res,next) => {
    CourseRepository.getCourses()
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getCourseById = (req,res,next) => {
    const course_id = req.params.course_id;

    CourseRepository.getCourseById(course_id)
        .then(course => {
            if(!course){
                res.status(400).json({
                    message: 'Course with id: ' + course_id + ' not found'
                });
            } else {
                res.status(200).json(course);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.createCourse = (req,res,next) => {
    CourseRepository.createCourse(req.body)
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

exports.updateCourse = (req,res,next) => {
    const course_id = req.params.course_id;

    CourseRepository.updateCourse(course_id, req.body)
        .then(result => {
            res.status(200).json({message: 'Course updated!', Course: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteCourse = (req,res,next) => {
    const course_id = req.params.course_id;
    console.log(course_id);

    CourseRepository.deleteCourse(course_id, req.body)
        .then( result => {
            res.status(200).json({message: 'Removed Course!', Course: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}