import { useState, useEffect } from "react";

export function useAsync(getMethod: any, params: any) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getResource() {
    try {
      setLoading(true);
      const result = await getMethod(...params);
      setValue(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getResource();
  }, params);

  return { value, error, loading };
}
