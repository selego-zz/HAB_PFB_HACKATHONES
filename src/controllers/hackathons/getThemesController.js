import generateErrorUtil from "../../utils/generateErrorUtil.js";
import getHackathonTechnologies from "../../services/hackathonService.js";

const getTechnologiesController = async (req, res, next) => {
  try {
    const technologies = await getHackathonTechnologies();

    if (!technologies || technologies.length === 0) {
      throw generateErrorUtil("No se encontraron tecnologías", 404);
    }

    res.send({
      status: "ok",
      message: "Tecnologías obtenidas",
      data: technologies,
    });
  } catch (err) {
    next(err);
  }
};

export default getTechnologiesController;
