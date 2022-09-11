module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      year: { type: Number, required: true },
      month: { type: Number, required: true },
      name: { type: String, required: true },
      path: { type: String, required: true },
      inDataBase: { type: Boolean, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const files = mongoose.model("files", schema);
  return files;
};
