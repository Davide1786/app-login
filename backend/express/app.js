const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const authenticateToken = require("../middleware/auth");

const routes = {
  user: require("./routes/user"),
};

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

for (const [routeName, routeController] of Object.entries(routes)) {
  const path = `/api/${routeName}`;

  if (routeController.getAll) {
    if (routeName === "user") {
      app.get(path, authenticateToken, makeHandlerAwareOfAsyncErrors(routeController.getAll));
    } else {
      app.get(path, makeHandlerAwareOfAsyncErrors(routeController.getAll));
    }
  }
  if (routeController.getById) {
    app.get(`${path}/:id`, makeHandlerAwareOfAsyncErrors(routeController.getById));
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
