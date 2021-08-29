import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchDiretorio extends Component {
    static displayName = "Nome";

    constructor() {
        super();
        this.state = { diretorios: [], loading: true}
    }

    componentDidMount() {
        this.populaDiretorioData();
    }

    static hadleEdit(id) {
        window.location.href = "/diretorio/edit/" + id;
    }

    static hadleDelete(id) {
        if (!window.confirm("Deseja deletar o diretório?"))
            return;
        else
            fetch('api/diretorios/' + id, { method: 'delete' }).then(json => { window.location.href = "fetch-diretorio"; alert('Deletado com Sucesso!') })
    }

    static renderDiretoriosTabela(diretorios) {
        return (
            <table className='table table-striped' aria-labelledby="tabelaLabel">
                <thead>
                    <tr>
                        <th>Guid</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diretorios.map(dir => 
                            <tr key={dir.id}>
                                <td>{dir.id} </td>
                                <td>{dir.nome}</td>
                                <td>
                                    <button className="btn btn-success" onClick={(id) => this.hadleEdit(dir.id)}> Editar </button> &nbsp;
                                    <button className="btn btn-danger" onClick={(id) => this.hadleDelete(dir.id)}> Excluir </button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
            );
    }

    render() {
        let contents = this.state.loading ? <p> <em> Carregando... </em></p> : FetchDiretorio.renderDiretoriosTabela(this.state.diretorios);

        return (
            <div>
                <h1 id="tabelaLabel">Diretórios</h1>
                <p>Lista de Diretórios</p>
                <p><Link to="/add-diretorio" > Cadastrar Diretórios</Link></p>
                {contents}
            </div>
            );
    }

    async populaDiretorioData() {
        const response = await fetch('api/Diretorios');
        const data = await response.json();
        this.setState({ diretorios: data, loading: false });
    }


}