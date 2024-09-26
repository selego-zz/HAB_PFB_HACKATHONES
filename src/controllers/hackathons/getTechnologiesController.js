import generateErrorUtil from "../../utils/generateErrorUtil.js";
import getHackathonThemes from "../../services/hackathonService.js";

const getThemesController = async (req, res, next) => {
  try {
    const themes = await getHackathonThemes();

    if (!themes || themes.length === 0) {
      throw generateErrorUtil("No se encontraron temas", 404);
    }

    res.send({
      status: "ok",
      message: "Temas obtenidos",
      data: themes,
    });
  } catch (err) {
    next(err);
  }
};

export default getThemesController;
