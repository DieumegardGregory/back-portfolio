const { Task } = require('../models');

const findManyTasks = async (_req, res) => {
    try {
        const [results] = await Task.findMany();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findOneTaskById = async (req, res) => {
    const id = req.params.id ? req.params.id : req.id;
    const statusCode = req.method === "POST" ? 201 : 200;
    try {
        const [result] = await Task.findOne(id);
        if (result.length === 0) {
            res.status(404).send('Aucune task trouvée');
        } else {
            res.status(statusCode).json(result[0]);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findTasksLinkedToExperience = async (req, res) => {
    const experienceId = req.params.id;
    console.log(experienceId);
    try {
        const [results] = await Task.findLinked(experienceId);
        console.log(results)
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createOneTask = async (req, res, next) => {
    const { name_task, experience_id } = req.body;
    try {
        const [result] = await Task.createOne({ name_task, experience_id });
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

const updateOneTask = async (req, res) => {
    const id = req.params.id;
    const { name_task } = req.body;
    let newTask = {};
    if (!name_task) return
    newTask.name_task = name_task;

    try {
        const [result] = await Task.updateOne(id, newTask);
        if (result.affectedRows > 0) {
            const [updatedTask] = await Task.findOne(id);
            res.status(200).json(updatedTask[0]);
        } else {
            res.status(400).send("La requête a échouée");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

}

const deleteOneTask = async (req, res) => {
    const id = req.params.id;
    if (isNaN(parseInt(req.params.id, 10))) {
        res.status(400).send("Veuillez fournir une id valide");
    }
    try {
        const [result] = await Task.deleteOne(id);
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
    findManyTasks,
    findOneTaskById,
    findTasksLinkedToExperience,
    createOneTask,
    updateOneTask,
    deleteOneTask,
}