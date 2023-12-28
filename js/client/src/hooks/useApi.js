import {useEffect, useState} from "react";
import apiAxios from "../utils/api-axios";

export function useApiGet(url, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    apiAxios.get(url, {params}).then((res) => {
      setData(res.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => setLoading(false));
  }, [url, params]);

  return {data, loading, error};
}