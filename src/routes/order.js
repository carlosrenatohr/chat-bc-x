import express from "express";
import orderController from '../controllers/order.js';
const router = express.Router();

router.get('/', (req, res) => res.status(200).send('server running yeah') )
router.post('/webhook', orderController.webhookFn);

export default router;