const db = require("../models");
const Auxiliar = db.Auxiliar;

exports.create = (req, res) => {
  const record = new Auxiliar(body);

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

  Auxiliar.find(query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving record.",
      });
    });
};

exports.findAllType = (req, res) => {
  const MES = parseInt(req.query.MES);
  const type = req.params.tipo;

  let query = { MES: { $eq: MES }, [type]: { $ne: 0 } };

  Auxiliar.find(query)
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
  const ids = [];
  req.body.map((id) => ids.push(id));

  let query = { _id: { $in: ids } };

  Auxiliar.find(query)
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

  Auxiliar.find(query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving records.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Auxiliar.findById(id)
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

  Auxiliar.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update record with id "${id}". Maybe record was not found!`,
        });
      } else res.send({ message: "Record was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating record with id "${id}"`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Auxiliar.findByIdAndRemove(id, { useFindAndModify: false })
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
        message: err.message || `Could not delete record with id "${id}"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Auxiliar.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Records were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all records.",
      });
    });
};
