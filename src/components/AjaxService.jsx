import axios from "axios"
export function postAjaxCall(api, inputParamJSON, callbackFn) {
    const config = {
        method: "post",
        data: inputParamJSON,
        url: api,
        headers: {
          "Content-Type": "application/json",
          // Authorization: cookie.load("userToken") || cookie.load("authToken"),
          "Access-Control-Allow-Origin": "*",
        },
      };
  
    axios
      .request(config)
      .then(function (response) {
        if (callbackFn) {
            callbackFn(response.data, null);
        } else {
            return response.data;
        }
      })
      .catch((error) => {
        callbackFn(null, error.response.data);
      });
  }