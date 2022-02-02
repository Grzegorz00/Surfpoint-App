const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Course = sequelize.define('Course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },

    instructor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },

    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: "isDate"
            },
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },

    dateTo: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: "isDate"
            }
        }
    }
});

module.exports = Course;