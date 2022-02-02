const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Instructor = sequelize.define('Instructor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,100],
                msg: "len_2_100"
            },
        }
    },

    surname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,100],
                msg: "len_2_100"
            },
        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5,50],
                msg: "len_5_50"
            },
            isEmail: {
                msg: "isEmail"
            },
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    sport: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,100],
                msg: "len_2_100"
            },
        }
    },

    price: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDecimal: {
                msg: "isDecimal"
            },
        }
    }
    
});


module.exports = Instructor;