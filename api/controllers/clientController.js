const ClientRepository = require('../repository/sequelize/ClientRepository');


exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients =>{
            res.render('pages/client/list', {
                clients: clients,
                navLocation: 'client'
            })
        })
}

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', {
        Client: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/client/add',
        navLocation: 'client'
    });
}

exports.showClientDetails = (req, res, next) => {
    const client_id = req.params.client_id;
    ClientRepository.getClientById(client_id)
        .then(client =>{
            res.render('pages/client/form', {
                Client: client,
                pageTitle: 'Szczegóły klienta',
                formMode: 'showDetails',
                btnLabel: 'Edytuj klienta',
                formAction: '',
                navLocation: 'client'
            });
        });
}

exports.showClientEditForm = (req, res, next) => {
    const client_id = req.params.client_id;
    ClientRepository.getClientById(client_id)
        .then(client =>{
            res.render('pages/client/form', {
                Client: client,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/client/edit',
                navLocation: 'client'
            });
        });
}

exports.addClient = (req, res, next) => {
    const clientData = { ...req.body };
    
    ClientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/client');
        });
};

exports.updateClient = (req, res, next) => {
    const client_id = req.body.id;
    const clientData = { ...req.body };

    ClientRepository.updateClient(client_id, clientData)
        .then( result => {
            res.redirect('/client');
        });
};

exports.deleteClient = (req, res, next) => {
    const client_id = req.params.client_id;

    ClientRepository.deleteClient(client_id)
    .then( () => {
        res.redirect('/client');
    });
};