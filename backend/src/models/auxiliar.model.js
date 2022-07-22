module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      MES: { type: Number, required: true },
      COMPROBANTE: String,
      FECHA: String,
      DESCRIPCION: String,
      DEBITOS: Number,
      CREDITOS: Number,
      FRANQUICIA: String,
      "FECHA VAOUCHER": String,
      TERMINAL: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Auxiliar = mongoose.model("auxiliars", schema);
  return Auxiliar;
};
