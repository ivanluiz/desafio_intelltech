import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchFormaGeometrica extends Component {
    static displayName = "Nome";

    constructor() {
        super();
        this.state = { formasGeometricas: [], loading: true }
    }

    componentDidMount() {
        this.populaFormaGeometricaData();
    }

    static renderFormasGeometricasTabela(formasGeometricas) {
        return (
            <table className='table table-striped' aria-labelledby="tabelaLabel">
                <thead>
                    <tr>
                        <th>Guid</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Diretorio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formasGeometricas.map(forms =>
                            <tr key={forms.id}>
                                <td><Link to={`/formaGeometrica/${forms.id}`}>{forms.id}</Link></td>
                                <td>{forms.nome}</td>
                                <td>{forms.tipo}</td>
                                <td>{forms.diretorio.nome}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading ? <p> <em> Carregando... </em></p> : FetchFormaGeometrica.renderFormasGeometricasTabela(this.state.formasGeometricas);

        return (
            <div>
                <h1 id="tabelaLabel">Formas Geométricas</h1>
                <p>Lista de Formas Geometricas</p>
                <p><Link to="/addformageometrica" > Cadastrar Formas Geométricas </Link></p>
                {contents}
            </div>
        );
    }

    async populaFormaGeometricaData() {
        const response = await fetch('api/FormaGeometricas');
        const data = await response.json();
        this.setState({ formasGeometricas: data, loading: false });
    }
}