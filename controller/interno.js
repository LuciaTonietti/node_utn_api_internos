import { Interno } from "../model/mongoDB/interno.js";
import { handleResponse } from "../services/handleResponse.js"

export const internoController = {
  async getTodos(req, res) {
    try {
      const internoCollection = await Interno.find();
      handleResponse(
        res,
        true,
        internoCollection.length
          ? "Listado de Internos"
          : "No hay Internos Registrados",
        internoCollection
      );
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
  async getById(req, res) {
    const { id } = req.params;

    if (!id) 
      return handleResponse(res, false, "Error al recibir el id", null, 400);

    try {
      const interno = await Interno.find({ _id: id });

      if (interno.length) {
        handleResponse(res, true, `Interno con Id ${id}`, interno);
      } else {
        handleResponse(res, false, `No se encontró interno con Id ${id}`, null, 404);
      }
    } catch (err) {
      return handleResponse(res, false, `Ocurrió un error: ${err.message}`, null, 500);
    }
  },
  async getByNro(req, res) {
    const { nro } = req.query;
    if (!nro)
      return handleResponse(res, false, "Error al recibir el nro de interno", null, 400);

    try {
      const interno = await Interno.find({ nro: nro });

      handleResponse(
        res,
        true,
        interno.length 
          ? `Interno con nro ${nro}`
          : `No se encontró un interno registrado con numero ${nro}`,
        interno
      );
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
  async create(req, res) {
    const { nro, anio, componente, choferes, estado } = req.body;
    const camposRequeridos = ["nro", "anio", "componente"];
    const faltanCampos = camposRequeridos.some((campo) => !req.body.hasOwnProperty(campo));

    if (faltanCampos)
      return handleResponse(
        res,
        false,
        "Faltan campos requeridos, puede ser nro, anio o componente",
        null,
        400
      );

    const nuevoInterno = new Interno({
      nro,
      anio,
      componente,
      choferes,
      estado,
    });

    try {
      const internoCreado = await nuevoInterno.save();
      handleResponse(res, true, "Interno Creado Correctamente", internoCreado);
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
  async update(req, res) {
    const allowedFields = ["nro", "anio", "componente", "choferes", "estado"];

    try {
      const updates = Object.keys(req.body);
      const operacionValida = updates.every((update) =>
        allowedFields.includes(update)
      );

      if (!operacionValida)
        return handleResponse(
          res,
          false,
          "Campo invalido en la peticion",
          null,
          400
        );

      const updatedInterno = await Interno.findByIdAndUpdate(
        req.params.id,
        req.body,
        { runValidators: true },
        { new: true }
      );

      if (!updatedInterno)
        return handleResponse(res, false, "Interno no encontrado", null, 404);

      handleResponse(
        res,
        true,
        "Interno Modificado Correctamente",
        updatedInterno
      );
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
  async delete(req, res) {
    const { id } = req.params;

    if (!id) 
      return handleResponse(res, false, "Error al recibir el id", null, 400);
    
    try {
      const deletedInterno = await Interno.findByIdAndDelete(id);

      if (!deletedInterno)
        return handleResponse(res, false, "Interno no encontrado", null, 404);

      handleResponse(
        res,
        true,
        `Eliminado el interno con id: ${req.params.id}`,
        deletedInterno
      );
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
