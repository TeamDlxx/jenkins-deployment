const { all_customer_count } = require("../DAL/customer");
const _dashboard_stat = async (resp) => {
  const customers = await all_customer_count();
  resp.data = { customers: customers };
  return resp;
};
const dashboard_stat = async () => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };
  resp = await _dashboard_stat(resp);
  return resp;
};

module.exports = {
  dashboard_stat,
};
