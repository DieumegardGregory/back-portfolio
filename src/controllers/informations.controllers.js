const { Info } = require('../models');

const findManyInfos = async (_req, res) => {
    try {
        const [results] = await Info.findMany();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneInfoById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        const [result] = await Info.findOne(id);
        if (result.length === 0) {
            res.status(404).send('Aucune info trouvée');
        } else {
            res.status(statusCode).json(result[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOneInfo = async (req, res, next) => {
    const { profile, looking_for } = req.body;
    try {
        const [result] = await Info.createOne({ profile, looking_for });
        req.id = result.insertId;
        if (result.affectedRows === 0) {
            res.status(400).send('La requête a échouée');
        } else {
            next();
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}

const updateOneInfo = async (req, res) => {
    const id = req.params.id;
    const { profile, looking_for } = req.body;
    let newInfo = {};
    if (profile) {
        newInfo.profile = profile;
    }
    if (looking_for) {
        newInfo.looking_for = looking_for;
    }

    try {
        const [result] = await Info.updateOne(id, newInfo);
        if (result.affectedRows > 0) {
            const [updatedInfo] = await Info.findOne(id);
            res.status(200).json(updatedInfo[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}

const deleteOneInfo = async (req, res) => {
    const id = req.params.id;
    if (isNaN(parseInt(req.params.id, 10))) {
        res.status(400).send("Veuillez fournir une id valide");
    }
    try {
        const [result] = await Info.deleteOne(id);
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
    findManyInfos,
    findOneInfoById,
    createOneInfo,
    updateOneInfo,
    deleteOneInfo,
}