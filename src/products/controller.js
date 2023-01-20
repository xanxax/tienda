const {ProductsService} = require('./services');
const {Response} = require('../common/response');

const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');


module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de productos', products)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params : {id} } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, product)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).lenght === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, 'Producto agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {params : {id}} = req;
            const { body: updateProductt } = req;
            const newProd = await ProductsService.update(id, updateProductt);
            Response.success(res, 200, `Producto actualizado`, newProd);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const {params: {id}} = req;
            const deleteProd = await ProductsService.borrar(id);
            Response.success(res, 202, `Producto borrado`, deleteProd);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateReport: (req, res) => {
        try {
            ProductsService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}