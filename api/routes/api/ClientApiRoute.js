const express = require('express');
const router = express.Router();
const clientApiController = require('../../api/ClientAPI');

router.get('/', clientApiController.getClients);
router.get('/:client_id', clientApiController.getClientById);
router.post('/', clientApiController.createClient);
router.put('/:client_id', clientApiController.updateClient);
router.delete('/:client_id', clientApiController.deleteClient);

module.exports = router;