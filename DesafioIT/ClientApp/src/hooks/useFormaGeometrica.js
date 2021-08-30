import { useState } from 'react';

function useFormaGeometrica() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [called, setCalled] = useState(false);

  return {
    getFormaGeometrica: (id) => {
      setLoading(true);
      setCalled(true);
      fetch(`api/FormaGeometricas/${id}`)
        .then(res => res.json())
        .then(data => {
          setData(data);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    loading,
    called,
    data,
    error,
  };
};

export default useFormaGeometrica;
