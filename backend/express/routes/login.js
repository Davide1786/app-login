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
      // { expiresIn: "1d" }
      { expiresIn: "30s" }
    );

    // Imposta cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", // oppure "none" se hai dominio diverso e HTTPS
      // secure: process.env.NODE_ENV === "production", // attivo solo in prod
      secure: false, // per test in localhost
      // maxAge: 24 * 60 * 60 * 1000, // 1 giorno
      maxAge: 30 * 1000, // durata cookie: 60 secondi (in millisecondi)
    });

    console.log("Cookie inviato:", req.cookies);

    // Escludi la password dai dati inviati al client
    const { password: _, ...userData } = user.toJSON();

    return res.status(200).json({
      message: "Login riuscito",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Errore nella login", error: error.message });
  }
}

module.exports = { login };
