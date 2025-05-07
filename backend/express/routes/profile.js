const { models } = require("../../sequelize");

async function getProfile(req, res) {
  try {
    const user = await models.user.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Errore interno", error: error.message });
  }
}

module.exports = { getProfile };
