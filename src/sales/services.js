const { ObjectId } = require('mongodb'); 
const { Database } = require('../database/index');

const COLLECTION = 'products';
const COLLECTION2 = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id)});
}

const update = async (id, updateSalee) => {
    const collection = await Database(COLLECTION);
    const collection2 = await Database(COLLECTION2);

    const filterProduc = await collection.findOne({ name: id });
    const filterUsu = await collection2.findOne({ nombre: updateSalee.nombre});

    if (!filterUsu) {
        return "usuario";
    } else if (!filterProduc){
        return "producto";
    } else {
        const options = {upsert:false};
        const total = filterProduc.cantidad-updateSalee.cantidad;
    
        if (filterUsu && total >=0) {
            const updateCantidad = {
                $set: {
                    cantidad: total
                }
            };
        const result = await collection.updateOne(filterProduc, updateCantidad, options)
        const ProdModificado = await collection.findOne({ name: id});
        return await ProdModificado;
        } else {
            return "cantidad";
        }
    }
    
}


module.exports.SalesService = {
    getAll,
    getById,
    update
}