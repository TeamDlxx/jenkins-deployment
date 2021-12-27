const { detailCustomer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const detail_customer = async (req, res) => {
  try {
    const { error, auth, error_message, data } = await detailCustomer(
      req.params.id,
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
      message: "customer",
      customer: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = detail_customer;
