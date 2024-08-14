import { Usuario } from "../model/mongoDB/usuario.js";
import { token } from "../services/jwt.js";
import { handleResponse } from "../services/handleResponse.js"
import bcrypt from "bcrypt";
const saltRounds = 10;

export const usuarioController = {
  async registrar(req, res) {
    
    const { nombreCompleto, email } = req.body;
    const contrasenia = await bcrypt.hash(req.body.contrasenia, saltRounds);
    const data = { nombreCompleto, email, contrasenia };
    const newUsuario = new Usuario(data);

    try {
      const usuarioRegistrado = await newUsuario.save();
      handleResponse(res, true, "Usuario Creado Correctamente", usuarioRegistrado);
    } catch (err) {
      return handleResponse(
        res,
        false,
        `Ocurrió un error: ${err.message}`,
        null,
        500
      );
    }
  },
  async login(req, res) {
    const { email } = req.body;

    if (!email) 
      return handleResponse(res, false, "Error al recibir el email", null, 400);
    
    try {
      const usuario = await Usuario.find().where({ email: email });

      if (!usuario.length) {
        return handleResponse(res, false, "Email o Contraseña Incorrecta", null, 204);
      }

      if (!usuario[0].contrasenia) 
        return handleResponse(res, false, "Error al recibir el email o constraseña", null, 400);

      const hashedContrasenia = usuario[0].contrasenia;
      const match = await bcrypt.compare(req.body.contrasenia, hashedContrasenia);

      if (!match) {
        return handleResponse(res, false, "Email o Contraseña Incorrecta", null, 401);
      }

      const accessToken = await token.generate(usuario[0]);
      console.log(accessToken); //ES SOLO PARA FACILITAR AL PROFE
      return handleResponse(res, true, "Usuario logueado correctamente", accessToken, 200);
    } catch (err) {
      return handleResponse(
        res,
        false,
        `Ocurrió un error: ${err.message}`,
        null,
        500
      );
    }
  },
  async getTodos(req, res) {
    try {
      const usuariosCollection = await Usuario.find();
      if(usuariosCollection.length) {
        handleResponse(res, true,  "Listado de Usuarios", usuariosCollection);
      } else {
        return handleResponse(res, false, "Error al obtener Listado de Usuarios", null, 400);
      }
      
    } catch (err) {
      return handleResponse(
        res,
        false,
        `Ocurrió un error: ${err.message}`,
        null,
        500
      );
    }
  },
};