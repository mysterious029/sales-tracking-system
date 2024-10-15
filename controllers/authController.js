const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).send('Email already exists');


    
    const user = new User({ name, email, password: password, role });
    try {
        await user.save();
        res.send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email not found');


    
    const validPass = await user.comparePassword(password);
    if (!validPass) return res.status(400).send('Invalid password');

   
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.header('Authorization', token).send({ token, role: user.role });
};
