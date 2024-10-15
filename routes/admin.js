const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');


router.get('/employees', auth, role(['admin']), async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' }, 'name email role');
        res.json(employees);
    } catch (error) {
        res.status(500).send('Error fetching employees');
    }
});


router.get('/view-sales', auth, role(['admin']), async (req, res) => {
    try {
        const sales = await Sale.find().populate('employeeId', 'name email');
        res.json(sales);
    } catch (error) {
        res.status(500).send('Error fetching sales');
    }
});

router.post('/create-employee', auth, role(['admin']), async (req, res) => {
    const { name, email, password, role } = req.body;
    
    const existingEmployee = await User.findOne({ email });
    if (existingEmployee) return res.status(400).send('Employee already exists');

    const newUser = new User({ name, email, password, role });
    try {
        await newUser.save();
        res.status(201).send('Employee created successfully');
    } catch (error) {
        res.status(400).send('Error creating employee');
    }
});


router.put('/update-employee/:id', auth, role(['admin']), async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    try {
        const employee = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
        if (!employee) return res.status(404).send('Employee not found');
        res.send('Employee updated successfully');
    } catch (error) {
        res.status(500).send('Error updating employee');
    }
});


router.delete('/delete-employee/:id', auth, role(['admin']), async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await User.findByIdAndDelete(id);
        if (!employee) return res.status(404).send('Employee not found');
        res.send('Employee deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting employee');
    }
});

module.exports = router;
