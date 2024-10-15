const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const auth = require('../middlewares/auth');

router.get('/my-sales', auth, async (req, res) => {
    try {
        const sales = await Sale.find({ employeeId: req.user._id });
        res.json(sales);
    } catch (error) {
        res.status(500).send('Error fetching sales');
    }
});


router.post('/submit-sale', auth, async (req, res) => {
    const { customerName, productDetails, price } = req.body;
    const sale = new Sale({
        employeeId: req.user._id,
        customerName,
        productDetails,
        price
    });

    try {
        await sale.save();
        res.send('Sale submitted successfully');
    } catch (error) {
        res.status(400).send('Error submitting sale');
    }
});

module.exports = router;
