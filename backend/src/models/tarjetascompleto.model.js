//DHE
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      MES: { type: Number, required: true },
      "Tipo Transaccion": Number,
      Comercio: Number,
      Franquicia: String,
      Cuenta: Number,
      "F vale": String,
      "F proceso": String,
      "F abono": String,
      Tarjeta: Number,
      "Hora trans": Number,
      Comprobante: Number,
      Autorizacion: [mongoose.Schema.Types.Mixed],
      Terminal: String,
      "Vlr Compra": Number,
      "Vlr Iva": Number,
      "Vlr Propina": Number,
      "Vlr Total": Number,
      "Vlr Comision": Number,
      "Vlr Rete Iva": Number,
      "Vlr Rete Ica": Number,
      "Vlr Rete Fuente": Number,
      "Vlr Abono": Number,
      "T Tarjeta": Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const TarjetasCompleto = mongoose.model("TarjetasCompleto", schema);
  return TarjetasCompleto;
};
