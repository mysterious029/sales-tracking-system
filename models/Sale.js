const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    customerName: { 
        type: String, 
        required: true 
    },
    productDetails: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Sale', saleSchema);
