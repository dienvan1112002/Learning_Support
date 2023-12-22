import { useState, useEffect, useCallback } from 'react';

function useApi(apiFunc, params) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const memoizedApiFunc = useCallback(apiFunc, [params]);

  useEffect(() => {
    memoizedApiFunc()
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [memoizedApiFunc]);

  return { result, error };
}

export default useApi;