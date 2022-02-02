const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.showClientList);
router.get('/add', clientController.showAddClientForm);
router.post('/add', clientController.addClient);
router.get('/details/:client_id', clientController.showClientDetails);
router.get('/edit/:client_id', clientController.showClientEditForm);
router.post('/edit', clientController.updateClient);
router.get('/delete/:client_id', clientController.deleteClient);

module.exports = router;