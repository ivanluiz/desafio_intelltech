import { useState } from 'react';

function useListDiretorios() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [called, setCalled] = useState(false);

  return {
    getDiretorios: () => {
      setLoading(true);
      setCalled(true);
      fetch('api/Diretorios')
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
    data,
    error,
    called,
  };
};

export default useListDiretorios;
