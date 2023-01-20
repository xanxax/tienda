const express = require('express');

const { ProductsController } = require('./controller');

const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
        .get('/', ProductsController.getProducts)  
        .get('/report', ProductsController.generateReport) 
        .get('/:id', ProductsController.getProduct) 
        .post('/', ProductsController.createProduct)
        .put('/:id', ProductsController.updateProduct)
        .delete('/:id', ProductsController.deleteProduct);


    app.use('/api/products', router)
}