const { Subskill } = require('../models');

const findManySubskills = async (_req, res) => {
    try {
        const [results] = await Subskill.findMany();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneSubskillById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        const [result] = await Subskill.findOne(id);
        if (result.length === 0) {
            res.status(404).send('Aucun subskill trouvé');
        } else {
            res.status(statusCode).json(result[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findSubskillsLinkedToHardskill = async (req, res) => {
    const hardskillId = req.params.id;
    try {
        const [results] = await Subskill.findLinked(hardskillId);
        console.log(results)
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOneSubskill = async (req, res, next) => {
    const { name_subskill, hardskill_id } = req.body;
    try {
        const [result] = await Subskill.createOne({ name_subskill, hardskill_id });
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

const updateOneSubskill = async (req, res) => {
    const id = req.params.id;
    const { name_subskill } = req.body;
    let newSubskill = {};
    if (!name_subskill) return
    newSubskill.name_subskill = name_subskill;

    try {
        const [result] = await Subskill.updateOne(id, newSubskill);
        if (result.affectedRows > 0) {
            const [updatedSubskill] = await Subskill.findOne(id);
            res.status(200).json(updatedSubskill[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}

const deleteOneSubskill = async (req, res) => {
    const id = req.params.id;
    if (isNaN(parseInt(req.params.id, 10))) {
        res.status(400).send("Veuillez fournir une id valide");
    }
    try {
        const [result] = await Subskill.deleteOne(id);
        if (result.affectedRows > 0) {
            res.sendStatus(204);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    findManySubskills,
    findOneSubskillById,
    findSubskillsLinkedToHardskill,
    createOneSubskill,
    updateOneSubskill,
    deleteOneSubskill,
}