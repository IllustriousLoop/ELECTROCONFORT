const db = require("../models");
const TarjetasCompleto = db.TarjetasCompleto;

exports.create = (req, res) => {
  const record = new TarjetasCompleto(req.body);

  record
    .save(record)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record.",
      });
    });
};

exports.findAll = (req, res) => {
  const MES = parseInt(req.query.MES);
  let query = { MES: { $eq: MES } };

  TarjetasCompleto.find(query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.findAllType = (req, res) => {
  const MES = parseInt(req.query.MES);
  const type = req.params.tipo;

  TarjetasCompleto.find({ MES: { $eq: MES }, [type]: { $ne: 0 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.findSpecific = (req, res) => {
  const MES = parseInt(req.query.MES);
  const dia = new Date(parseInt(req.params.dia)).toLocaleDateString();
  const { terminal, franquicia, tipo } = req.params;

  const query = {
    MES: { $eq: MES },
    Comercio: { $eq: terminal },
    Franquicia: { $eq: franquicia },
    "F abono": { $eq: dia },
    "Tipo Transaccion": { $eq: tipo },
  };

  TarjetasCompleto.find(query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.findAllIds = (req, res) => {
  const MES = parseInt(req.query.MES);

  TarjetasCompleto.find({
    MES: { $eq: MES },
  })
    .then((data) => {
      let b = [];
      data.forEach((re) => {
        if (re["T Tarjeta"] === req.body[0]) {
          b.push(re);
        }
      });
      res.send(b);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  TarjetasCompleto.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: `Not found record with id "${id}"` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving record with id "${id}"`,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  TarjetasCompleto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update record with id "${id}". Maybe record was not found!`,
        });
      } else res.send({ message: "record was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating record with id "${id}"`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  TarjetasCompleto.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete record with id "${id}". Maybe record was not found!`,
        });
      } else {
        res.send({
          message: "Record was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete record with id "${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  TarjetasCompleto.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};
