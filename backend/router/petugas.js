const express = require("express");
const app = express();
// const { response } = require('../helper/wrapper')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { petugas } = require("../models/index");
const { masyarakat } = require("../models/index");
const md5 = require("md5");
const auth = require("../auth");
const response = require("../helper/response");

app.get("/", auth("Admin", "Petugas"), async (req, res) => {
  await petugas
    .findAll()
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success get data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "failed get data"));
    });
});

app.get("/:id", auth("Admin", "Petugas"), async (req, res) => {
  const param = {
    id: req.params.id,
  };
  await petugas
    .findOne({ where: param })
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success get data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "failed get data"));
    });
});

app.post("/", auth("Admin"), async (req, res) => {
  const data = {
    nama: req.body.nama,
    password: md5(req.body.password),
    level: req.body.level,
  };
  const param = {
    username: req.body.username,
  };
  const resultMasyarakat = await masyarakat.findOne({ where: param });
  const resultPetugas = await petugas.findOne({ where: param });
  if (resultMasyarakat || resultPetugas) {
    res
      .status(404)
      .json(response.data("failed", null, 404, "Username is Already exist"));
  } else {
    data.username = param.username;
    await petugas
      .create(data)
      .then((result) => {
        res
          .status(200)
          .json(response.data("success", result, 200, "Success post data"));
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "failed post data"));
      });
  }
});

app.put("/", auth("Admin", "Petugas"), async (req, res) => {
  const param = {
    id: req.body.id,
  };
  const payload = {
    nama: req.body.nama,
    level: req.body.level,
  };
  const data = {};
  if (req.body.password) {
    payload.password = md5(req.body.password);
  }
  if (req.body.username) {
    data.username = req.body.username;
    const resultMasyarakat = await masyarakat.findOne({ where: data });
    const resultPetugas = await petugas.findOne({ where: data });
    if (resultMasyarakat || resultPetugas) {
      res
        .status(404)
        .json(response.data("failed", null, 404, "Username is Already exist"));
    } else {
      payload.username = data.username;
      await petugas
        .update(payload, { where: param })
        .then((result) => {
          res
            .status(200)
            .json(response.data("success", result, 200, "Success edit data"));
        })
        .catch((err) => {
          res
            .status(400)
            .json(response.data("failed", null, 400, "failed edit data"));
        });
    }
  } else {
    payload.username = data.username;
    await petugas
      .update(payload, { where: param })
      .then((result) => {
        res
          .status(200)
          .json(response.data("success", result, 200, "Success edit data"));
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "failed edit data"));
      });
  }
});

app.delete("/:id", auth("Admin"), async (req, res) => {
  const param = {
    id: req.params.id,
  };
  petugas
    .destroy({ where: param })
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success delete data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "failed delete data"));
    });
});

module.exports = app;
