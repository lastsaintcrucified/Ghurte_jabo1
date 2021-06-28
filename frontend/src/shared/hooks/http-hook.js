import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      const httpAbortCrtl = new AbortController();
      activeHttpRequest.current.push(httpAbortCrtl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCrtl.signal,
        });
        
        const data = await response.json();
        activeHttpRequest.current = activeHttpRequest.current.filter(
            (abortCrtl) => abortCrtl !== httpAbortCrtl
          );
        if (!response.ok) {
          throw new Error(data.message);
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setErrMsg(error.message);
        throw error;
      }
    },
    []
  );

  const errorHandler = () => {
    setErrMsg(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCrtl) => abortCrtl.abort());
    };
  }, []);
  return { isLoading, errMsg, sendRequest, errorHandler };
};
