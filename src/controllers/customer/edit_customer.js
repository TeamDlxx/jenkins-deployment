const {
  validateEditCustomerSignup,
} = require("../../utils/validation/customer");
const { editCustomer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const edit_customer = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validateEditCustomerSignup(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }

    const { error, auth, error_message, data } = await editCustomer(
      req.body,
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
      message: "customer  edit Successfully",
      customer: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = edit_customer;
