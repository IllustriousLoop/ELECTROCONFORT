const db = require("../models");
const TarjetasR = db.TarjetasR;

exports.create = (req, res) => {
  if (!req.body.MES) {
    return res.status(400).send({ message: "MES can not be empty!" });
  }

  const record = new TarjetasR(req.body);

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
  if (!req.query.MES) {
    return res.status(400).send({ message: "MES can not be empty!" });
  }
  const MES = parseInt(req.query.MES);
  let query = { MES: { $eq: MES } };

  TarjetasR.find(query)
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

  TarjetasR.findById(id)
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

  TarjetasR.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Registro with id "${id}". Maybe record was not found!`,
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

  TarjetasR.findByIdAndRemove(id, { useFindAndModify: false })
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
        message: `Could not delete record with id "${id}"`,
      });
    });
};

exports.deleteAll = (req, res) => {
  TarjetasR.deleteMany({})
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
