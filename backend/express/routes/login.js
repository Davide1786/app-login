const { models } = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await models.user.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password errata" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      SECRET_KEY,
      { expiresIn: "600s" }
    );

    const { password: _, ...userData } = user.toJSON();

    res.status(200).json({
      message: "Login riuscito",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Errore nella login", error: error.message });
  }
}

module.exports = { login };
