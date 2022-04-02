const express = require("express");
const app = express();
// const { response } = require("../helper/wrapper");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { history_lelang, lelang } = require("../models/index");

const response = require("../helper/response");

app.get("/", auth("Admin", "Petugas", "masyarakat"), async (req, res) => {
  await history_lelang
    .findAll({
      include: [
        "lelang",
        "masyarakat",
        {
          model: lelang,
          as: "lelang",
          include: ["barang"],
        },
      ],
    })
    .then((result) => {
      res
        .status(200)
        .json(
          response.data(
            "success",
            result,
            200,
            "Success get data history lelang"
          )
        );
    })
    .catch((err) => {
      res
        .status(400)
        .json(
          response.data("failed", null, 400, "Failed get data history lelang")
        );
    });
});

app.get(
  "/:idMasyarakat",
  auth("Admin", "Petugas", "masyarakat"),
  async (req, res) => {
    const param = {
      idMasyarakat: req.params.idMasyarakat,
    };
    await history_lelang
      .findAll({
        where: param,
        include: [
          "lelang",
          {
            model: lelang,
            as: "lelang",
            include: ["barang"],
          },
        ],
      })
      .then((result) => {
        res
          .status(200)
          .json(
            response.data(
              "success",
              result,
              200,
              "Success get data history lelang"
            )
          );
      })
      .catch((err) => {
        res
          .status(400)
          .json(
            response.data("failed", null, 400, "Failed get data history lelang")
          );
      });
  }
);

app.get(
  "/:id/idLelang/:idLelang",
  auth("Admin", "Petugas", "masyarakat"),
  async (req, res) => {
    const param = {
      idLelang: req.params.idLelang,
      id: req.params.id,
    };
    await history_lelang
      .findAll({
        where: param,
        include: ["lelang"],
      })
      .then((result) => {
        res
          .status(200)
          .json(
            response.data(
              "success",
              result,
              200,
              "Success get data history lelang"
            )
          );
      })
      .catch((err) => {
        res
          .status(400)
          .json(
            response.data("failed", null, 400, "Failed get data history lelang")
          );
      });
  }
);

module.exports = app;
