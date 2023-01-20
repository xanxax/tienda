const {SalesService} = require('./services');
const {Response} = require('../common/response');

const createError = require('http-errors');
const debug = require('debug')('app:module-sales-controller');

module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            let products = await SalesService.getAll();
            Response.success(res, 200, 'Lista de productos', products)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getSale: async (req, res) => {
        try {
            const { params : {id} } = req;
            let product = await SalesService.getById(id);
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
    updateSale: async (req, res) => {
        try {
            const {params : {id}} = req;
            const { body: updateSalee } = req;
            const newProd = await SalesService.update(id, updateSalee);
            if (newProd == "usuario" ) {
                Response.error(res, new createError.NotFound('El usuario no está registrado'))
            } else if (newProd == "producto"){
                Response.error(res, new createError.NotFound('No existe el producto seleccionado'))
            } else if (newProd == "cantidad")  {
                Response.error(res, new createError.NotFound('No hay suficientes unidades del producto'))
            } else {
                Response.success(res, 200, `Producto comprado por ${updateSalee.nombre}`, newProd);
            }           
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
}