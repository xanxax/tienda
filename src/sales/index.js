const express = require('express');

const { SalesController } = require('./controller');

const router = express.Router(); 

module.exports.SalesAPI = (app) => {
    router
        .get('/', SalesController.getSales)  
        .get('/:id', SalesController.getSale)  
        .put('/:id', SalesController.updateSale);


    app.use('/api/sales', router) 
}