import {generateErrorUtil,} from "../../utils/index.js";
import {createHackathonInscriptionModel} from "../../models/index.js";
import {enrollsInSchema} from "../../schemas/index.js"
// recibe id de hackaton, id de usuario y fecha y devuelve id de inscripcion
const inscriptionHackathonController = async (req, res, next) => {
  try {
    await validateSchema(enrollsInSchema,req.body)
    const { hackathonId } = req.params;
    const { userId } = req.body;

    const inscription = await createHackathonInscriptionModel(hackathonId, userId);

    if (!inscription) {
      throw generateErrorUtil("No se pudo crear la inscripción", 500);
    }

    res.status(201).send({
      status: "ok",
      message: "Inscripción realizada con éxito",
      data: inscription,
    });
  } catch (err) {
    next(err);
  }
};

export default inscriptionHackathonController;
