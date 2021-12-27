const { validateCode } = require("../../utils/validation/app_api");
const { codeValidation } = require("../../services/app_api");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const code_verification = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validateCode(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }

    const { error, auth, error_message, data } = await codeValidation(req.body);

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
      message: "Code Verified!",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = code_verification;
