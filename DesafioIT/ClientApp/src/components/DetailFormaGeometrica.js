import React, { useEffect } from "react";
import useFormaGeometrica from '../hooks/useFormaGeometrica';

export const DetailFormaGeometrica = ({ match }) => {
    const { getFormaGeometrica, data, loading, called} = useFormaGeometrica();

    useEffect(() => {
      getFormaGeometrica(match.params.id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderForma = () => (
      <>
        <div className="col-md-6"><b>ID: </b>{data.id}</div>
        <div className="col-md-6"><b>Nome: </b>{data.nome}</div>
        <div className="col-md-6"><b>Tipo: </b>{data.tipo}</div>
        <div className="col-md-6"><b>Cor: </b>{data.cor}</div>
        <div className="col-md-6"><b>Tamanho: </b>{data.tamanho}px</div>
        <div className="col-md-6">
          <b>Diretório: </b><br/>
          {data.diretorio.nome}{' '}<small style={{color: '#555'}}>({data.diretorio.id})</small>
        </div>
      </>
    )

    return (
      <div>
          <h3>Forma Geométrica</h3>
          {loading || !called ? 'Carregando...' : renderForma()}
      </div>
    );
}