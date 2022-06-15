const { Experience } = require('../models');

const findManyExperiences = async (req, res) => {
    const { join } = req.query;
    try {
        if (join === "tasks") {
            const [results] = await Experience.findManyWithTasks();
            res.status(200).json(results);
        } else {
            const [results] = await Experience.findMany();
            res.status(200).json(results);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneExperienceById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const { join } = req.query;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        if (join === "tasks") {
            const [result] = await Experience.findOneWithTasks(id);
            if (result.length === 0) {
                res.status(404).send('Aucune expérience trouvée');
            } else {
                res.status(statusCode).json(result[0]);
            }
        } else {
            const [result] = await Experience.findOne(id);
            if (result.length === 0) {
                res.status(404).send('Aucune expérience trouvée');
            } else {
                res.status(statusCode).json(result[0]);
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.message);
    }
}

const createOneExperience = async (req, res, next) => {
    const { name_experience, place_experience, starting_year, ending_year } = req.body;
    try {
        const [result] = await Experience.createOne({ name_experience, place_experience, starting_year, ending_year });
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

const updateOneExperience = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name_experience, place_experience, starting_year, ending_year } = req.body;
    let newExperience = {};
    if (name_experience) {
        newExperience.name_experience = name_experience;
    }
    if (place_experience) {
        newExperience.place_experience = place_experience;
    }
    if (starting_year) {
        newExperience.starting_year = starting_year;
    }
    if (ending_year) {
        newExperience.ending_year = ending_year;
    }
    try {
        const [result] = await Experience.updateOne(id, newExperience);
        if (result.affectedRows === 1 && result.changedRows === 0) {
            res.status(200).send("Aucun changement effectué");
        } else if (result.affectedRows > 0) {
            const [updatedExperience] = await Experience.findOne(id);
            res.status(200).json(updatedExperience[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteOneExperience = async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await Experience.deleteOne(id);
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
    findManyExperiences,
    findOneExperienceById,
    createOneExperience,
    updateOneExperience,
    deleteOneExperience,
}