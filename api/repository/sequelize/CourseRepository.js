const Sequelize = require('sequelize');

const Instructor = require('../../model/sequelize/Instructor');
const Course = require('../../model/sequelize/Course');
const Client = require('../../model/sequelize/Client');

exports.getCourses = () => {
    return Course.findAll({include: [
        {
            model: Instructor,
            as: 'instructor'
        },
        {
            model: Client,
            as: 'client'
        }
    ]});
}

exports.getCourseById = (course_id) => {
    return Course.findByPk(course_id, {include: [
        {
            model: Instructor,
            as: 'instructor'
        },
        {
            model: Client,
            as: 'client'
        }
    ]
    })
}

exports.createCourse = (newCourseData) => {
    console.log(JSON.stringify(newCourseData));
    console.log("eloooooooooooooooooooooo");

    return Course.create({
        client_id: newCourseData.client_id,
        instructor_id: newCourseData.instructor_id,
        dateFrom: newCourseData.dateFrom,
        dateTo: newCourseData.dateTo
    })
}

exports.updateCourse = (course_id, courseData) => {
    return Course.update(courseData, {where: {id: course_id}});
}

exports.deleteCourse = (course_id) => {
    return Course.destroy({
        where: { id: course_id}
    });
}

exports.deleteManyCourses = (course_ids) => {
    return Course.find({ id: { [Sequelize.Op.in]: course_ids}});
}