const { models } = require("../../sequelize");
const bcrypt = require("bcrypt");
const { getIdParam } = require("../helpers");

async function getAll(req, res) {
  try {
    const user = await models.user.findAll({});
    res.status(200).json(user);
  } catch (error) {
    console.error("Errore durante il recupero dell user:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero dell user" });
  }
}

// Recupera un singolo utente in base al suo id
// async function getById(req, res) {
//   const id = getIdParam(req);

//   try {
//     // Uso findByPk per trovare l'utente con l'id specificato
//     const user = await models.user.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ message: "utente non trovato" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Errore durante il recupero del utente:", error);
//     res.status(500).json({ error: "Si è verificato un errore durante il recupero del giocatore" });
//   }
// }

async function create(req, res) {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    return res.status(400).json({ error: "Campi obbligatori mancanti." });
  }

  if (req.body.id) {
    return res.status(400).send("L'ID non deve essere fornito, è generato automaticamente.");
  }

  try {
    const existingUser = await models.user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email già registrata." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await models.user.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Errore nella creazione dell'utente:", error);
    res.status(500).json({ error: "Errore interno", message: error.message });
  }
}

module.exports = {
  getAll,
  create,
  // getById,
};
