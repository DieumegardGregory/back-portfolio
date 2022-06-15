
const { User } = require('../models');

const findManyUsers = async (req, res) => {
  try {
    const [results] = await User.findMany();
    res.status(200).json(results)
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const findOneUserById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
    if (Number.isNaN(parseInt(id, 10))) {
    res.status(400).send('Vous devez renseigner une ID valide');
  } 
    try {
      const [results] = await User.findOne(id);
      if (results.length === 0) {
      res.status(400).send(`L'utilisateur avec l'id ${id} n'a pas été trouvé!`);
    } else {
      res.status(statusCode).json(results[0]);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const createOneUser = async (req, res, next) => {
  const { email, password } = req.body;
  const check = await User.emailAlreadyExists(email);
  if (check) {
    res.status(400).send("Cet email est déjà utilisé");
  } else {

    try {
      const hashedPassword = await User.hashPassword(password);
      const [result] = await User.createOne({ email, password: hashedPassword });
      if (result.affectedRows === 0) {
        res.status(400).send('La requête a échouée');
      } else {
        req.id = result.insertId;
        next();
      }
    } catch (err) {
    res.status(500).send(err.message);
    }
  }
}

const updateOneUser = async (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  let newUser = {};
  if (email) {
    newUser.email = email;
  }
  if (password) {
    const hashedPassword = await User.hashPassword(password);
    newUser.password = hashedPassword;
  }
  try {
    const [result] = await User.updateOne(id, newUser);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      const [updatedUser] = await User.findOne(id);
      res.status(200).json(updatedUser[0]);
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
};

const deleteOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const [results] = await User.deleteOne(id);
    if (results.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).send(`La piste avec l'id ${id} n'a pas été trouvée`)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  findManyUsers,
  findOneUserById,
  createOneUser,
  updateOneUser,
  deleteOneUser,
}