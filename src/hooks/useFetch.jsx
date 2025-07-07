import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../config/axios';

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();

    const fetchData = async () => {
        console.log(`Fetching data from ${endpoint} with options:`, options);
      try {
        const response = await axiosInstance({
          url: endpoint,
          cancelToken: cancelToken.token,
          ...options,
        });
        setData(response.data ); // Adjust based on API response structure
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup for cancellation
    return () => cancelToken.cancel();
  }, [endpoint, JSON.stringify(options)]); // re-run when endpoint/options change

  return { data, loading, error };
}
