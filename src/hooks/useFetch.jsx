import {useState} from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      console.error('useFetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {data, loading, error, fn};
};

export default useFetch;