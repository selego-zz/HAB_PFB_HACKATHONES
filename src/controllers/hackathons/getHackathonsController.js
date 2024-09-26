import generateErrorUtil from "../../utils/generateErrorUtil.js";
import getAllHackathons from "../../services/hackathonService.js";

const getHackathonsController = async (req, res, next) => {
  try {
    const hackathons = await getAllHackathons();

    if (!hackathons || hackathons.length === 0) {
      throw generateErrorUtil("No se encontraron hackatones", 404);
    }

    res.status(200).json({
      status: "ok",
      message: "Hackatones obtenidos",
      data: hackathons,
    });
  } catch (err) {
    next(err);
  }
};

export default getHackathonsController;
