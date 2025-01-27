
import React from "react";
import endpoint from "./Axios";

const useAxios = ({ api, method, needToken }: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({});
  const reset = () => {
    setData(null);
    setLoading(false);
  };

  const onCall = async ({ data, headers = {}, params, query }: any) => {

    setLoading(true);

    const tkn = window.sessionStorage.getItem("token");
    if (needToken && !tkn) {
      setLoading(false);
      return;
    }

    if (tkn && !headers["session-id"])
      headers["session-id"] = `${tkn}`;

    try {
      let result;
      if (method === "get" || method === "delete") {

        result = await endpoint[method](query ? `${api}/${query}` : api, {
          headers,
          params,
          data,
        });
      } else
        result = await endpoint[method](api, data, { headers, params });
      setLoading(false);
      setData(result.data);
      return Promise.resolve(result.data);
    } catch (err) {
      setLoading(false);
      setData(err);
      return Promise.reject(err);
    }
  }

  return {
    loading,
    data,
    reset,
    onCall,
  };
  // https://api.segmind.com/v1/sd2.1-txt2img
};

export default useAxios;
