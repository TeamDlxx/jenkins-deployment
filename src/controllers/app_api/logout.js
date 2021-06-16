const { logout_user } = require("../../services/app_api");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const logout = async (req, res) => {
  try {

    const { error, auth, error_message } = await logout_user(
      req.user
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    if (!auth) {
      return res.status(403).json({
        code: 403,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Logout successfull",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = logout;
