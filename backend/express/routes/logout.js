function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    // secure: process.env.NODE_ENV === "production",
    secure: false, // per test in localhost
  });
  res.status(200).json({ message: "Logout eseguito con successo" });
}

module.exports = { logout };
