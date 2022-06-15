const { Formation } = require('../models');

const findManyFormations = async (req, res) => {
    try {
        const [results] = await Formation.findMany();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneFormationById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        const [result] = await Formation.findOne(id);
        if (result.length === 0) {
            res.status(404).send('Aucune formation trouvée');
        } else {
            res.status(statusCode).json(result[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOneFormation = async (req, res, next) => {
    const { name_formation, place_formation, year_formation, school } = req.body;
    try {
        const [result] = await Formation.createOne({ name_formation, place_formation, year_formation, school });
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

const updateOneFormation = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name_formation, place_formation, year_formation, school } = req.body;
    let newFormation = {};
    if (name_formation) {
        newFormation.name_formation = name_formation;
    }
    if (place_formation) {
        newFormation.place_formation = place_formation;
    }
    if (year_formation) {
        newFormation.year_formation = year_formation;
    }
    if (school) {
        newFormation.school = school;
    }
    try {
        const [result] = await Formation.updateOne(id, newFormation);
        if (result.affectedRows === 1 && result.changedRows === 0) {
            res.status(200).send("Aucun changement effectué");
        } else if (result.affectedRows > 0) {
            const [updatedFormation] = await Formation.findOne(id);
            res.status(200).json(updatedFormation[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteOneFormation = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const [result] = await Formation.deleteOne(id);
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
    findManyFormations,
    findOneFormationById,
    createOneFormation,
    updateOneFormation,
    deleteOneFormation,
}