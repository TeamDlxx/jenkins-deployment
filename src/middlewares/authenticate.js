const jwt = require("jsonwebtoken");
const { checking_session } = require("../DAL/session");

const authenticate = async (req, res, next) => {
  const token = req.header("x-sh-auth");
  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "No Token Provided",
    });
  } else {
    try {
      let authorized = false;
      let login_token = "";
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      login_token = decoded.login_token;
      // logic to to authorize or not
      authorized = true;
      if (authorized) {
        authorized = true;
        //  put user inside req
        const is_sssion = await checking_session(login_token);
        if (!is_sssion) {
          return res.status(401).send({ message: "Your are un authorize" });
        }
        req.user = is_sssion.user_id;
        next();
      } else {
        return res.status(401).json({
          code: 401,
          message: "Invalid Token",
        });
      }
    } catch (e) {
      console.log("error", e);
      return res.status(401).json({
        code: 401,
        message: "Invalid Token",
      });
    }
  }
};

module.exports = { authenticate };
