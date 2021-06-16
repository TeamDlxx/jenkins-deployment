const { validateUser } = require("../../utils/validation/app_api");
const { login_user } = require("../../services/app_api");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const signup = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validateUser(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }

    const { error, auth, error_message, data } = await login_user(req.body);

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
      message: "Login Successfull",
      token: data.token,
      user: data.admin,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = signup;
