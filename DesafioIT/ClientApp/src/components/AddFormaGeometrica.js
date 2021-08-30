import React, { useEffect } from "react";
import { QUADRADO, TRIANGULO } from '../constants/enums';
import { formaGeometricoTipo } from '../utils/functions';
import useListDiretorios from '../hooks/useListDiretorios';

export const AddFormaGeometrica = (props) => {
    const { getDiretorios, data, loading, called } = useListDiretorios();

    useEffect(() => {
        getDiretorios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSalvar = (event) => {
        event.preventDefault();

        let data = {
            nome: event.target.nome.value,
            tipo: Number(event.target.tipo.value),
            tamanho: Number(event.target.tamanho.value),
            cor: event.target.cor.value,
            diretorioid: event.target.diretorioid.value
        };

        fetch("api/FormaGeometricas/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => {
                const location = {
                    pathname: '/fetch-formaGeometrica',
                    state: { reload: true }
                }

                props.history.push(location);
            });
    }

    const renderForm = () => {
        return (
            <form onSubmit={handleSalvar}>
                <div className="form-group row">
                    <div className="col-md-6">
                      <label for="diretorioSelect">Diretorio</label>
                      <select class="form-control" id="diretorioSelect" name="diretorioid">
                        {data.map((item, index) => (
                          <option selected={index === 0} value={item.id}>{item.nome}</option>
                        ))}
                      </select>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        Nome
                        <input className="form-control" type="text" name="nome" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="tipo" id="inlineRadio1" value={QUADRADO} checked/>
                        <label className="form-check-label" for="inlineRadio1">{formaGeometricoTipo(QUADRADO)}</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="tipo" id="inlineRadio2" value={TRIANGULO} />
                        <label className="form-check-label" for="inlineRadio2">{formaGeometricoTipo(TRIANGULO)}</label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        Tamanho
                        <input className="form-control" type="number" name="tamanho" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        Cor
                        <input className="form-control" type="text" name="cor" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Salvar</button>
                </div>
            </form>
        );
    }

    return (
      <div>
          <h3>Adicionar Forma Geométrica</h3>
          {loading || !called ? 'Carregando...' : renderForm()}
      </div>
    );
}