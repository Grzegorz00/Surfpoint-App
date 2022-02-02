const Instructor = require('../../model/sequelize/Instructor');
const Course = require('../../model/sequelize/Course');
const Client = require('../../model/sequelize/Client');

exports.getClients = () => {
    return Client.findAll();
};

exports.getClientById = (client_id) => {
    return Client.findByPk(client_id,
        {   
            include: [{
                model: Course,
                as: 'courses',
                include: [{
                    model: Instructor,
                    as: 'instructor'
                }]
            }]
        })
        .catch(err => {
            console.log("--------- " + err + " -------------");
          });
};

exports.createClient = (newClientData) => {
    return Client.create({
        name: newClientData.name,
        surname: newClientData.surname,
        age: newClientData.age,
        phoneNumber: newClientData.phoneNumber
    })
}

exports.updateClient = (client_id, clientData) => {
    return Client.update(clientData, {where: {id: client_id}})
        .catch(err => {
            console.log(err);
        });
};

exports.deleteClient = (client_id) => {
    return Client.destroy({
        where: { id: client_id}
    });
}