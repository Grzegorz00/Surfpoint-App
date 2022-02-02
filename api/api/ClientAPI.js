const ClientrRepository = require('../repository/sequelize/ClientRepository');

exports.getClients = (req,res,next) => {
    ClientrRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getClientById = (req,res,next) => {
    const client_id = req.params.client_id;
    
    ClientrRepository.getClientById(client_id)
        .then(client => {
            if(!client){
                res.status(400).json({
                    message: 'Client with id: ' + client_id + ' not found'
                });
            } else {
                res.status(200).json(client);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.createClient = (req,res,next) => {
    ClientrRepository.createClient(req.body)
        .then(newObj => {
            res.status(200).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateClient = (req,res,next) => {
    const client_id = req.params.client_id;

    ClientrRepository.updateClient(client_id, req.body)
        .then(result => {
            res.status(200).json({message: 'Client updated!', client: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteClient = (req,res,next) => {
    const client_id = req.params.client_id;

    ClientrRepository.deleteClient(client_id, req.body)
        .then( result => {
            res.status(200).json({message: 'Removed Client!', client: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}