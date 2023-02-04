const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const payoutController = require('../controllers/payoutController')

const app = express();

// Set Render Engine
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

// Load Body parser for JSON responses
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET: Home Route
router.get('/', async (req, res) => {
    res.render('../views/payCustomer');
});

// POST: Required Fields
router.post('/get-required-fields', async (req, res, next) => {
    payoutController.getRequiredFields(req, res, next);
});

// POST: Send payout
router.post('/send-payment', async (req, res, next) => {
    payoutController.sendPayment(req, res, next);
});

// POST: Payment Completed Webhook URL
router.post("/payment-complete", (req, res) => {
  console.log(req.body);
  res.status(200).end(); 
});

module.exports = router;