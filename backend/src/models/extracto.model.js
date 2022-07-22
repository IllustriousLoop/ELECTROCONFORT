//cn01
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      MES: { type: Number, required: true },
      FECHA: String,
      DESCRIPCION: String,
      TERMINAL: Number,
      DEBITO: Number,
      CREDITO: Number,
      TIPO: [mongoose.Schema.Types.Mixed],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const TarjetasR = mongoose.model("extractos", schema);
  return TarjetasR;
};
