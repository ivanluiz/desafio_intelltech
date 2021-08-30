import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useListDiretorios from '../hooks/useListDiretorios';

export const FetchDiretorio = () => {
    const { getDiretorios, data: diretorios, loading, called } = useListDiretorios();

    useEffect(() => {
      getDiretorios();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderDiretoriosTabela = (diretorios) => {
      return (
        <table className='table table-striped' aria-labelledby="tabelaLabel">
          <thead>
            <tr>
              <th>Guid</th>
              <th>Nome</th>
            </tr>
        </thead>
        <tbody>
          {
            diretorios.map(dir => 
              <tr key={dir.id}>
                <td>{dir.id} </td>
                <td>{dir.nome}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      );
    }
  
    return (
      <div>
        <h1 id="tabelaLabel">Diretórios</h1>
        <p>Lista de Diretórios</p>
        <p><Link to="/adddiretorio"> Cadastrar Diretórios</Link></p>
        {loading || !called ? 'Carregando...' : renderDiretoriosTabela(diretorios)}
      </div>
    )
}
