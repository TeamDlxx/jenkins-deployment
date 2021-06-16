const { get_website_setting } = require("../../services/website_setting");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const websiteSetting = async (req, res) => {
  try {
    const { error, auth, error_message, data } = await get_website_setting();

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
      message: "Website Setting",
      setting: data.website_setting,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = websiteSetting;
