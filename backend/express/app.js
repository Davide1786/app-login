const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const authenticateToken = require("../middleware/auth");
const profileRoute = require("./routes/profile");
const logoutRoute = require("./routes/logout");
const cookieParser = require("cookie-parser");

const routes = {
  user: require("./routes/user"),
};

const app = express();

// app.use(cors()); // localstorage

// uso per cookie
app.use(
  cors({
    origin: "http://localhost:5173", // o il tuo dominio
    credentials: true, // 🔥 IMPORTANTE: abilita i cookie
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

app.post("/api/login", makeHandlerAwareOfAsyncErrors(loginRoute.login));
app.get("/api/profile", authenticateToken, makeHandlerAwareOfAsyncErrors(profileRoute.getProfile));
app.post("/api/logout", logoutRoute.logout);
for (const [routeName, routeController] of Object.entries(routes)) {
  const path = `/api/${routeName}`;

  if (routeController.getAll) {
    const handler = makeHandlerAwareOfAsyncErrors(routeController.getAll);
    app.get(path, routeName === "user" ? authenticateToken : (req, res, next) => next(), handler);
  }

  if (routeController.getById) {
    const handler = makeHandlerAwareOfAsyncErrors(routeController.getById);
    app.get(`${path}/:id`, handler);
  }

  if (routeController.create) {
    app.post(path, makeHandlerAwareOfAsyncErrors(routeController.create));
  }

  if (routeController.update) {
    app.put(`${path}/:id`, makeHandlerAwareOfAsyncErrors(routeController.update));
  }

  if (routeController.remove) {
    app.delete(`${path}/:id`, makeHandlerAwareOfAsyncErrors(routeController.remove));
  }
}

module.exports = app;
