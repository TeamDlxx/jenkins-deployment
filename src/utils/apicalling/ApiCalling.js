const axios = require("axios");

axios.defaults.headers.post["Content-Type"] = "application/json";

async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) {
  let reqObj = {
    method: method,
    url: path,
    headers: { ...headers },
  };

  if (method === "GET") {
    reqObj["params"] = queryParams;
  }

  if (method === "POST") {
    reqObj["data"] = postData;
    reqObj["params"] = queryParams;
    //console.log("params called");
  }
  if (method === "PUT") {
    reqObj["data"] = postData;
    reqObj["params"] = queryParams;
    //console.log("params called");
  }
  if (method === "DELETE") {
    reqObj["data"] = postData;
    reqObj["params"] = queryParams;
    //console.log("params called");
  }

  let results = undefined;

  var status_codes = [200, 400, 401, 403, 404];

  try {
    console.log("axios requestOBJ ==> ", reqObj);
    results = await axios(reqObj);
    if (results.code === 200) {
      console.log("axios response ==> ", results.data);
      return results.data;
    } else {
      throw new Error("NETWORK ERROR : Some Thing Went Wrong!");
    }
  } catch (error) {
    console.log("axios error ==> ", error);
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
}

module.exports.invokeApi = invokeApi;
