import { useState, useEffect } from "react";

export function useAsync(getMethod: any, params: any) {
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getResource = async (): Promise<any> => {
    try {
      setLoading(true);
      const result = await getMethod(...params);
      setValue(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResource();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, params);

  return { value, error, loading };
}
