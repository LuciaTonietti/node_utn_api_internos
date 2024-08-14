import mongoose from "mongoose";

const internoSchema = mongoose.Schema(
  {
    nro: {
      type: String,
      required: [true, "El campo 'nro' es obligatorio."],
    },
    anio: {
      type: Number,
      required: [true, "El campo 'anio' es obligatorio."],
      default: 0o0,
    },
    componente: {
      type: String,
      required: [true, "El campo 'componente' es obligatorio."],
    },
    choferes: {
      type: [String],
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: {
        values: ["Activo", "Inactivo", "En Reparacion"],
        message: "El estado debe ser uno de los siguientes valores: Activo, Inactivo, En Reparacion",
      },
      default: "Activo",
    },
  },
  { timestamps: true }
);

internoSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Interno = mongoose.model("Interno", internoSchema);
