const express = require("express");
const app = express();
// const { response } = require("../helper/wrapper");
const { toIsoString } = require("../helper/date");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const auth = require("../auth");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { barang } = require("../models/index");
const { lelang } = require("../models/index");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./barangImage");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

const response = require("../helper/response");

const getStatus = async (idBarang) => {
  const param = {
    idBarang: idBarang,
  };
  const statusDilelang = await lelang.findOne({ where: idBarang });
  if (statusDilelang) {
    return true;
  } else {
    return false;
  }
};

app.get("/", auth("Admin", "Petugas", "masyarakat"), async (req, res) => {
  // const allData = await barang.findAll();

  // let mtArr = [];
  // const tes = allData.map(async (item, i) => {
  //   const status = await getStatus(item.id);

  //   if (status) {
  //     console.log("dilelang");
  //     await mtArr.push({
  //       ...item,
  //       dataValues: {
  //         ...item.dataValues,
  //         statusDilelang: true,
  //       },
  //     });
  //   } else {
  //     console.log("tidakdilelang");

  //     await mtArr.push({
  //       ...item,
  //       dataValues: {
  //         ...item.dataValues,
  //         statusDilelang: false,
  //       },
  //     });
  //   }
  // });

  // res
  //   .status(200)
  //   .json(response.data("success", await mtArr, 200, "Success get data"));

  await barang
    .findAll()
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success get data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "Failed to get data"));
    });
});

app.get("/:id", auth("Admin", "Petugas", "masyarakat"), async (req, res) => {
  const param = {
    id: req.params.id,
  };
  await barang
    .findOne({ where: param })
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success get data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "Failed to get data"));
    });
});

app.get(
  "/namaBarang/:nama",
  auth("Admin", "Petugas", "masyarakat"),
  async (req, res) => {
    const param = {
      nama: req.params.nama,
    };
    await barang
      .findOne({ where: param })
      .then((result) => {
        res
          .status(200)
          .json(response.data("success", result, 200, "Success get data"));
      })
      .catch((err) => {
        res
          .status(400)
          .json(response.data("failed", null, 400, "Failed to get data"));
      });
  }
);

app.post(
  "/",
  upload.single("image"),
  auth("Admin", "Petugas"),
  async (req, res) => {
    const date = new Date(Date.now());
    if (!req.file) {
      res
        .status(406)
        .json(response.data("failed", null, 406, "Image is required"));
    } else {
      const data = {
        nama: req.body.nama,
        hargaAwal: req.body.hargaAwal,
        deskripsi: req.body.deskripsi,
        tgl: toIsoString(date),
        image: req.file.filename,
      };
      const param = {
        nama: req.body.nama,
      };
      const BarangAlready = await barang.findOne({ where: param });

      if (BarangAlready) {
        res
          .status(400)
          .json(response.data("failed", null, 400, "Product is Already exist"));
      } else {
        await barang
          .create(data)
          .then((result) => {
            res
              .status(200)
              .json(response.data("success", result, 200, "Success post data"));
          })
          .catch((err) => {
            res
              .status(402)
              .json(response.data("failed", null, 402, "Failed to post data"));
          });
      }
    }
  }
);

app.put(
  "/",
  upload.single("image"),
  auth("Admin", "Petugas"),
  async (req, res) => {
    const date = new Date(Date.now());
    const param = {
      id: req.body.id,
    };
    const data = {
      nama: req.body.nama,
      hargaAwal: req.body.hargaAwal,
      deskripsi: req.body.deskripsi,
      tgl: toIsoString(date),
    };
    if (req.file) {
      const result = await barang.findOne({ where: param });
      const oldFileName = result.image;

      // delete old file
      const dir = await path.join(__dirname, "../barangImage", oldFileName);
      fs.unlink(dir, (err) => console.log(err));
      // set new filename
      data.image = req.file.filename;
    }

    const processEdit = async () => {
      await barang
        .update(data, { where: param })
        .then((result) => {
          res
            .status(200)
            .json(response.data("success", result, 200, "Success edit data"));
        })
        .catch((err) => {
          res
            .status(400)
            .json(response.data("failed", null, 400, "Failed to edit data"));
        });
    };

    const barangSebelumnya = await barang.findOne({ where: param });

    if (barangSebelumnya.nama === req.body.nama) {
      processEdit();
    } else {
      const paramNama = { nama: req.body.nama };
      const namaBarangSama = await barang.findOne({ where: paramNama });

      if (namaBarangSama) {
        res
          .status(403)
          .json(response.data("failed", null, 403, "Product is Already exist"));
      } else {
        processEdit();
      }
    }
  }
);

app.delete("/:id", auth("Admin", "Petugas"), async (req, res) => {
  const param = {
    id: req.params.id,
  };
  let result = await barang.findOne({ where: param });
  let oldFileName = result.image;

  // delete old file
  let dir = path.join(__dirname, "../barangImage", oldFileName);
  fs.unlink(dir, (err) => console.log(err));
  await barang
    .destroy({ where: param })
    .then((result) => {
      res
        .status(200)
        .json(response.data("success", result, 200, "Success delete data"));
    })
    .catch((err) => {
      res
        .status(400)
        .json(response.data("failed", null, 400, "Failed to delete data"));
    });
});

module.exports = app;
