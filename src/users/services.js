const { ObjectId } = require('mongodb');
const { Database } = require('../database/index');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray(); 
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id)});
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId; 
}

const update = async (id, updateUser) => {
    const collection = await Database(COLLECTION);
    const filter = await collection.findOne({ _id: ObjectId(id)});
    const options = {upsert:false};
    const updateUsuario = {
        $set: {
            ...updateUser
        }
    };
    const result = await collection.updateOne(filter, updateUsuario, options)
    return await getById(id); 
}

const borrar = async (id) => {
    const collection = await Database(COLLECTION);
    const filter = await collection.findOne({ _id: ObjectId(id)});
    const result = await collection.deleteOne(filter);
    return result;

}



module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    borrar
}