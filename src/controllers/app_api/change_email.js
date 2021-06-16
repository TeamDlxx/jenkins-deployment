const { validateEmail } = require("../../utils/validation/app_api");
const { change_email } = require("../../services/app_api");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const changeEmail = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validateEmail(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }

    const { error, auth, error_message } = await change_email(
      req.body,
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
      message: "Email Changed Successfully",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = changeEmail;
