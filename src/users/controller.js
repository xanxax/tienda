const {UsersService} = require('./services');
const {Response} = require('../common/response');

const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de usuarios', users)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params : {id} } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id}`, user)
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).lenght === 0) {
                Response.error(res, new createError.BadRequest())
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const {params : {id}} = req;
            const { body: updateUser } = req;
            const newUser = await UsersService.update(id, updateUser);
            Response.success(res, 200, `Usuario actualizado`, newUser);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {params: {id}} = req;
            const deleteUser = await UsersService.borrar(id);
            Response.success(res, 200, `Usuario borrado`, deleteUser);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    
}