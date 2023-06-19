const express = require("express");
const router = express.Router();
const orderController  = require('../controllers/order');

router.get('/', (req, res) => res.status(200).send('server running yeah') )
router.post('/webhook', orderController.webhookFn);

module.exports = router; 