//cn01
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      MES: { type: Number, required: true },
      "Codigo  establec": Number,
      Cuenta: Number,
      Franquicia: String,
      "Fecha de proceso": String,
      "Fecha de Abono": String,
      "Tipo Transaccion": Number,
      "Vlr Compras": Number,
      "Vlr Iva": Number,
      "Vlr Propina": Number,
      "Vlr Total": Number,
      "Valor Comision": Number,
      "Vlr Rete Iva": Number,
      "Vlr Rete Ica": Number,
      "Valor Rte Fte": Number,
      "Valor Abono": Number,
      asociado: [mongoose.Schema.Types.Mixed],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const TarjetasR = mongoose.model("TarjetasR", schema);
  return TarjetasR;
};
