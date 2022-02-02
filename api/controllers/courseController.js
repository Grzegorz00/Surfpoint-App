const CourseRepository = require('../repository/sequelize/CourseRepository');
const ClientRepository = require('../repository/sequelize/ClientRepository');
const InstructorRepository = require('../repository/sequelize/InstructorRepository');
const Instructor = require('../model/sequelize/Instructor');
const Client = require('../model/sequelize/Client');

exports.showCourseList = (req, res, next) => {
    CourseRepository.getCourses()
        .then(courses =>{
            res.render('pages/course/list', {
                courses: courses,
                navLocation: 'course'
            })
        })
}


exports.showAddCourseForm = (req, res, next) => {
    let allInstructors, allClients;
    InstructorRepository.getInstructors()
        .then(instructors => {
            allInstructors = instructors;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/course/form', {
                course: {},
                formMode: 'createNew',
                allInstructors: allInstructors,
                allClients: allClients,
                pageTitle: 'Nowy kurs',
                btnLabel: 'Dodaj kurs',
                formAction: '/course/add',
                navLocation: 'course'
            })
        })
}

exports.showCourseDetails = (req, res, next) => {
    const course_id = req.params.course_id;
    let allInstructors, allClients;

    InstructorRepository.getInstructors()
        .then(instructors => {
            allInstructors = instructors;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return CourseRepository.getCourseById(course_id);
        })
        .then(course => {
            console.log("all clients: " + allClients.length);+
            res.render('pages/course/form', {
                course: course,
                allInstructors: allInstructors,
                allClients: allClients,
                pageTitle: 'Szczegóły kursu',
                formMode: 'showDetails',
                btnLabel: 'Edytuj kurs',
                formAction: '',
                navLocation: 'course'
            });
        });
}

exports.showCourseEditForm = (req, res, next) => {
        const course_id = req.params.course_id;
    let allInstructors, allClients;

    InstructorRepository.getInstructors()
        .then(instructors => {
            allInstructors = instructors;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return CourseRepository.getCourseById(course_id);
        })
        .then(course => {
            console.log("all clients: " + allClients.length);+
            res.render('pages/course/form', {
                course: course,
                allInstructors: allInstructors,
                allClients: allClients,
                pageTitle: 'Edycja kursu',
                formMode: 'edit',
                btnLabel: 'Edytuj kurs',
                formAction: '/course/edit',
                navLocation: 'course'
            });
        });
}

exports.addCourse = (req, res, next) => {
    const courseData = { ...req.body };
    CourseRepository.createCourse(courseData)
        .then( result => {
            res.redirect('/course');
        });
};

exports.updateCourse = (req, res, next) => {
    const course_id = req.body.id;
    const courseData = { ...req.body };

    CourseRepository.updateCourse(course_id, courseData)
        .then( result => {
            res.redirect('/course');
        });
};

exports.deleteCourse = (req, res, next) => {
    const course_id = req.params.course_id;

    CourseRepository.deleteCourse(course_id)
    .then( () => {
        res.redirect('/course');
    });
};