import express from "express";
import "./config/db.js";
import 'dotenv/config'
import { router as internosRouter } from "./router/interno.js";
import { router as usuariosRouter } from "./router/usuario.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.urlencoded({ extendended: true }));
app.use(express.json());

app.listen(PORT, (err) => {
  console.log(
    err
      ? `Error ${err.message}`
      : `Servidor corriendo en http://127.0.0.1:${PORT}`
  );
});

app.use("/api/internos", internosRouter);
app.use("/api/usuarios", usuariosRouter);