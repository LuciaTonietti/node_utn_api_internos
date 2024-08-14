import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    nombreCompleto: {
      type: String,
      required: [true, "El campo 'nombreCompleto' es obligatorio."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El campo 'email' es obligatorio."],
      trim: true,
    },
    contrasenia: {
      type: String,
      required: [true, "El campo 'contrasenia' es obligatorio."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.contrasenia;
    }
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);