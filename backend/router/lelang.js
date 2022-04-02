const express = require("express");
const app = express();
// const { response } = require("../helper/wrapper");
const { toIsoString } = require("../helper/date");
const { lelangStatus } = require("../helper/enum");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { lelang } = require("../models/index");
const { barang } = require("../models/index");
const { history_lelang } = require("../models/index");
const { runTime } = require("../helper/endTime");

const response = require("../helper/response");

app.get("/", auth("Admin", "Petugas", "masyarakat"), async (req, res) => {
  await lelang
    .findAll({
      include: ["barang", "masyarakat"],
    })
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

app.get("/:id", auth("Admin", "Petugas", "masyarakat"), async (req, res) => {
  const param = {
    id: req.params.id,
  };
  await lelang
    .findOne({ where: param })
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success to get data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "failed to get data"));
    });
});

app.get(
  "/idBarang/:idBarang",
  auth("Admin", "Petugas", "masyarakat"),
  async (req, res) => {
    const param = {
      idBarang: req.params.idBarang,
    };
    await lelang
      .findOne({ where: param, include: ["barang"] })
      .then((result) => {
        res
          .status(200)
          .json(response.data("success", result, 200, "Success to get data"));
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "failed to get data"));
      });
  }
);

app.get(
  "/idMasyarakat/:idMasyarakat",
  auth("Admin", "Petugas", "masyarakat"),
  async (req, res) => {
    const param = {
      idMasyarakat: req.params.idMasyarakat,
    };
    await lelang
      .findAll({ where: param, include: ["barang"] })
      .then((result) => {
        res
          .status(200)
          .json(response.data("success", result, 200, "Success to get data"));
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "failed to get data"));
      });
  }
);

app.post("/", auth("Admin", "Petugas"), async (req, res) => {
  const date = new Date(Date.now());
  const idBarang = {
    id: req.body.idBarang,
  };
  const resultBarang = await barang.findOne({ where: idBarang });
  const data = {
    idBarang: req.body.idBarang,
    tglLelang: toIsoString(date),
    hargaAkhir: resultBarang.dataValues.hargaAwal,
    idPetugas: req.body.idPetugas,
    status: req.body.status,
  };

  const alreadyExist = await lelang.findOne({
    where: { idBarang: req.body.idBarang },
  });

  if (alreadyExist) {
    res
      .status(403)
      .json(response.data("failed", null, 403, "Item is already exist"));
  } else {
    if (data.status === lelangStatus.DIBUKA) {
      let end = new Date(req.body.endTime);
      let timeStamp = end.getTime();
      data.endTime = end;
      await lelang
        .create(data)
        .then((result) => {
          runTime("* * * * * *", timeStamp, result.dataValues.id);
          res
            .status(200)
            .json(
              response.data("success", result, 200, "Success to post data")
            );
        })
        .catch((err) => {
          res
            .status(404)
            .json(
              response.data("failed", null, 404, "Can't set time now time")
            );
        });
    } else {
      await lelang
        .create(data)
        .then((result) => {
          res
            .status(200)
            .json(
              response.data("success", result, 200, "Success to post data")
            );
        })
        .catch((err) => {
          res
            .status(400)
            .json(response.data("failed", null, 400, "Failed to post data"));
        });
    }
  }
});

app.put("/", auth("Admin", "Petugas"), async (req, res) => {
  const date = new Date(Date.now());
  const idBarang = {
    id: req.body.idBarang,
  };
  // const resultBarang = await barang.findOne({ where: idBarang });
  const param = {
    id: req.body.id,
  };
  const data = {
    idBarang: req.body.idBarang,
    tglLelang: toIsoString(date),
    // hargaAkhir: resultBarang.dataValues.hargaAwal,
    idPetugas: req.body.idPetugas,
    status: req.body.status,
  };
  if (data.status === lelangStatus.DIBUKA) {
    let end = new Date(req.body.endTime);
    let timeStamp = end.getTime();
    data.endTime = end;
    await lelang
      .update(data, { where: param })
      .then((result) => {
        runTime("* * * * * *", timeStamp, param.id);
        res
          .status(200)
          .json(
            response.data("success", result, 200, "Success to update data")
          );
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "Failed to update data"));
      });
  } else {
    await lelang
      .update(data, { where: param })
      .then((result) => {
        res
          .status(200)
          .json(
            response.data("success", result, 200, "Success to update data")
          );
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "Failed to update data"));
      });
  }
});

app.post("/bid", auth("masyarakat"), async (req, res) => {
  const idLelang = {
    id: req.body.id,
  };
  const resultLelang = await lelang.findOne({ where: idLelang });
  const { hargaAkhir, status } = resultLelang.dataValues;
  const data = {
    idLelang: idLelang.id,
    idMasyarakat: req.body.idMasyarakat,
    penawaranHarga: req.body.penawaranHarga,
  };
  if (status === lelangStatus.DITUTUP) {
    // return response(res, "fail", "", "Status is closed", 400);
    res
      .status(401)
      .json(response.data("failed", null, 401, "Status is closed"));
  } else if (data.penawaranHarga <= hargaAkhir) {
    // return response(res, "fail", "", "bid must be higher", 400);
    res
      .status(400)
      .json(response.data("failed", null, 400, "bid must be higher"));
  } else {
    await history_lelang.create(data);
    await lelang
      .update(
        {
          hargaAkhir: req.body.penawaranHarga,
          idMasyarakat: data.idMasyarakat,
        },
        { where: idLelang }
      )
      .then((result) => {
        res.status(201).json(response.data("success", result, 201, "Succ bid"));
      })
      .catch((err) => {
        res
          .status(401)
          .json(response.data("failed", null, 401, "Status is closed"));
      });
  }
});

app.delete("/:id", async (req, res) => {
  const param = {
    id: req.params.id,
  };
  lelang
    .destroy({ where: param })
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success to delete data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "Failed to delete data"));
    });
});

module.exports = app;
