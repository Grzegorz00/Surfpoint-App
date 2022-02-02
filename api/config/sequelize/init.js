const sequelize = require('./sequelize');

const Instructor = require('../../model/sequelize/Instructor');
const Course = require('../../model/sequelize/Course');
const Client = require('../../model/sequelize/Client');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');
const adminPassword = authUtil.hashPassword('admin');

module.exports = () => {
    Instructor.hasMany(Course, {as: 'courses', foreignKey: {name: 'instructor_id', allowNull: false}, constraints: true, onDelete: 'Cascade'});
    Course.belongsTo(Instructor, {as: 'instructor', foreignKey: {name: 'instructor_id', allowNull: false}});
    Client.hasMany(Course, {as: 'courses', foreignKey: {name: 'client_id', allowNull: false}, constraints: true, onDelete: 'Cascade'});
    Course.belongsTo(Client, {as: 'client', foreignKey: {name: 'client_id', allowNull: false}}); // error client na Client

    let allInstructors, allClients;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Instructor.findAll();
        })
        .then(instructors => {
            if(!instructors || instructors.length == 0){
                return Instructor.bulkCreate([
                    {name: 'Admin', surname: 'Admin', email: 'admin@admin.admin', sport: 'admin', price: 0, password: adminPassword},
                    {name: 'Adam', surname: 'Malysz', email: 'adam.malysz@gmail.com', sport: 'Windsurfing', price: 50, password: passHash},
                    {name: 'Mariusz', surname: 'Pudzianowski', email: 'mariusz.pudzianowski@gmail.com', sport: 'Windsurfing', price: 100, password: passHash},
                    {name: 'Jan', surname: 'Kowalski', email: 'jan.kowalski@gmail.com', sport: 'Kitesurfing', price: 80, password: passHash}
                ])
                .then( () => {
                    return Instructor.findAll();
                });
            } else {
                return instructors;
            }
        })
        .then( instructors => {
            allInstructors = instructors;
            return Client.findAll();
        })
        .then( clients => {
            if(!clients || clients.length == 0){
                return Client.bulkCreate([
                    {name: 'Jan', surname: 'Janowski', age: 18, phoneNumber: 111222333},
                    {name: 'Adam', surname: 'Adamowski', age: 20, phoneNumber: 222333444},
                    {name: 'Patryk', surname: 'Patrykowski', age: 18, phoneNumber: 333222111}
                ])
                .then( () => {
                    return Client.findAll();
                });
            } else {
                return clients;
            }
        })
        .then(clients => {
            allClients = clients;
            return Course.findAll();
        })
        .then( courses => {
            if(!courses || courses.length == 0){
                return Course.bulkCreate([
                    {client_id: allClients[0].id, instructor_id: allInstructors[1].id, dateFrom: '2021-01-01', dateTo: '2021-01-08'},
                    {client_id: allClients[1].id, instructor_id: allInstructors[2].id, dateFrom: '2021-01-03', dateTo: '2021-01-09'},
                    {client_id: allClients[2].id, instructor_id: allInstructors[3].id, dateFrom: '2021-01-10', dateTo: '2021-01-15'}
                ])
            } else {
                return courses;
            }
        })
}