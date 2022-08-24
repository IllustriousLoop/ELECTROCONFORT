const mesValid = (req, res, next) => {
  if (!req.query.MES)
    return res.status(400).send({ message: "MES can not be empty!" });
  next();
};

exports.valid = mesValid;
