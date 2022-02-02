const InstructorRepository = require('../repository/sequelize/InstructorRepository');
const authUtil = require('../util/authUtils');

exports.showInstructorList = (req, res, next) => {
    InstructorRepository.getInstructors()
        .then(instructors =>{
            res.render('pages/instructor/list', {
                instructors: instructors,
                navLocation: 'instructor'
            })
        })
}

exports.showAddInstructorForm = (req, res, next) => {
    res.render('pages/instructor/form', {
        instructor: {},
        pageTitle: 'Nowy instruktor',
        formMode: 'createNew',
        btnLabel: 'Dodaj instruktora',
        formAction: '/instructor/add',
        navLocation: 'instructor'
    });
}

exports.showInstructorDetails = (req, res, next) => {
    const instructor_id = req.params.instructor_id;
    InstructorRepository.getInstructorById(instructor_id)
        .then(instructor =>{
            res.render('pages/instructor/form', {
                instructor: instructor,
                pageTitle: 'Szczegóły instruktora',
                formMode: 'showDetails',
                btnLabel: 'Edytuj instruktora',
                formAction: '',
                navLocation: 'instructor'
            });
        });
}

exports.showInstructorEditForm = (req, res, next) => {
    const instructor_id = req.params.instructor_id;
    InstructorRepository.getInstructorById(instructor_id)
        .then(instructor =>{
            res.render('pages/instructor/form', {
                instructor: instructor,
                pageTitle: 'Edycja instruktora',
                formMode: 'edit',
                btnLabel: 'Edytuj instruktora',
                formAction: '/instructor/edit',
                navLocation: 'instructor'
            });
        });
}

exports.addInstructor = (req, res, next) => {
    const instructorData = { ...req.body };
    instructorData.password = authUtil.hashPassword(instructorData.password);

    InstructorRepository.createInstructor(instructorData)
        .then( result => {
            res.redirect('/instructor');
        });
};

exports.updateInstructor = (req, res, next) => {
    const instructor_id = req.body.id;
    const instructorData = { ...req.body };

    InstructorRepository.updateInstructor(instructor_id, instructorData)
        .then( result => {
            res.redirect('/instructor');
        });
};

exports.deleteInstructor = (req, res, next) => {
    const instructor_id = req.params.instructor_id;

    InstructorRepository.deleteInstructor(instructor_id)
    .then( () => {
        res.redirect('/instructor');
    });
};