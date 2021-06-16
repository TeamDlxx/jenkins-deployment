const { dashboard_stat } = require("../../services/init");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const admin_dashboard = async (req, res) => {
  try {
    const { error, auth, error_message, data } = await dashboard_stat();

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
      message: "Dashboard stat successfully",
      data: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = admin_dashboard;
