import generateErrorUtil from "../../utils/generateErrorUtil.js";
import createHackathonInscription from "../../services/inscriptionService.js";

const inscriptionHackathonController = async (req, res, next) => {
  try {
    const { hackathonId } = req.params;
    const { userId } = req.body;

    if (!hackathonId || isNaN(hackathonId)) {
      throw generateErrorUtil("ID de Hackathon no válido", 400);
    }

    if (!userId) {
      throw generateErrorUtil("ID de usuario es obligatorio", 400);
    }

    // Crear la inscripción
    const inscription = await createHackathonInscription(hackathonId, userId);

    if (!inscription) {
      throw generateErrorUtil("No se pudo crear la inscripción", 500);
    }

    res.status(201).json({
      status: "ok",
      message: "Inscripción realizada con éxito",
      data: inscription,
    });
  } catch (err) {
    next(err);
  }
};

export default inscriptionHackathonController;
