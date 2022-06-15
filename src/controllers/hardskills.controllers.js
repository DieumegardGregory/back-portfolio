const { Hardskill } = require('../models');

const findManyHardskills = async (req, res) => {
    const { join } = req.query;
    try {
        if (join === "subskills") {
            const [results] = await Hardskill.findManyWithSubskills();
            res.status(200).json(results);
        } else {
            const [results] = await Hardskill.findMany();
            res.status(200).json(results);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneHardskillById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        const [result] = await Hardskill.findOne(id);
        if (result.length === 0) {
            res.status(404).send('Aucun hardskill trouvé');
        } else {
            res.status(statusCode).json(result[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOneHardskill = async (req, res, next) => {
    const { name_hardskill } = req.body;
    try {
        const [result] = await Hardskill.createOne({ name_hardskill });
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

const updateOneHardskill = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name_hardskill } = req.body;
    const newHardskill = {};
    if (name_hardskill) {
        newHardskill.name_hardskill = name_hardskill;
    }
    try {
        const [result] = await Hardskill.updateOne(id, newHardskill);
        if (result.affectedRows > 0) {
            const [updatedHardskill] = await Hardskill.findOne(id);
            res.status(200).json(updatedHardskill[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteOneHardskill = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const [result] = await Hardskill.deleteOne(id);
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
    findManyHardskills,
    findOneHardskillById,
    createOneHardskill,
    updateOneHardskill,
    deleteOneHardskill,
}