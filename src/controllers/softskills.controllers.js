const { Softskill } = require('../models');

const findManySoftskills = async (req, res) => {
    try {
        const [results] = await Softskill.findMany();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneSoftskillById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        const [result] = await Softskill.findOne(id);
        if (result.length === 0) {
            res.status(404).send('Aucun softskill trouvé');
        } else {
            res.status(statusCode).json(result[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOneSoftskill = async (req, res, next) => {
    const { name_softskill } = req.body;
    try {
        const [result] = await Softskill.createOne({ name_softskill });
        req.id = result.insertId;
        if (result.affectedRows === 0) {
            res.status(400).send('La requête a échouée');
        } else {
            next();
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateOneSoftskill = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name_softskill } = req.body;
    const newSoftskill = {};
    if (name_softskill) {
        newSoftskill.name_softskill = name_softskill;
    }
    try {
        const [result] = await Softskill.updateOne(id, newSoftskill);
        if (result.affectedRows > 0) {
            const [updatedSoftskill] = await Softskill.findOne(id);
            res.status(200).json(updatedSoftskill[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteOneSoftskill = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const [result] = await Softskill.deleteOne(id);
        if (result.affectedRows === 0) {
            res.status(400).send("La requête a échouée");
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    findManySoftskills,
    findOneSoftskillById,
    createOneSoftskill,
    updateOneSoftskill,
    deleteOneSoftskill,
}