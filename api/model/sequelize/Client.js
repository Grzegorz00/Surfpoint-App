const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Client', {
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

    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDecimal: {
                msg: "isDecimal"
            }
        }
    },

    phoneNumber: {
        type: Sequelize.STRING(9),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDecimal: {
                msg: "isDecimal"
            },
            len: {
                args: [2,100],
                msg: "len_2_100"
            },
        }
    }
});

module.exports = Client;