const Instructor = require('../../model/sequelize/Instructor');
const Course = require('../../model/sequelize/Course');
const Client = require('../../model/sequelize/Client');

exports.getInstructors = () => {
    return Instructor.findAll();
};

exports.getInstructorById = (instructor_id) => {
    return Instructor.findByPk(instructor_id,{
        include: [{
            model: Course,
            as: 'courses',
            include: [{
                model: Client,
                as: 'client'
            }]
        }]
    })
};

exports.createInstructor = (newInstructorData) => {
    return Instructor.create({
        name: newInstructorData.name,
        surname: newInstructorData.surname,
        email: newInstructorData.email,
        password: newInstructorData.password,
        sport: newInstructorData.sport,
        price: newInstructorData.price
    })
};

exports.updateInstructor = (instructor_id, instructorData) => {
    return Instructor.update(instructorData, {where: {id: instructor_id}});
};

exports.deleteInstructor = (instructor_id) => {
    return Instructor.destroy({
        where: { id: instructor_id}
    });
};

exports.findByEmail = (email) => {
    return Instructor.findOne({
        where: {email: email}
    });
}