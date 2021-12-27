const { validateEmail } = require("../../utils/validation/app_api");
const { validateEmailAddress } = require("../../services/app_api");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const email_verificatin = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validateEmail(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }

    const { error, auth, error_message, data } = await validateEmailAddress(
      req.body
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
      message: "Email Verified!",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = email_verificatin;
