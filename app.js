const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');


const authRoute = require('./routes/auth');
const employeeRoute = require('./routes/employee');
const adminRoute = require('./routes/admin');

const app = express();

dotenv.config();


app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth', authRoute);
app.use('/api/employee', employeeRoute);
app.use('/api/admin', adminRoute);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
    res.send('Welcome to the Sales Tracking System API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
