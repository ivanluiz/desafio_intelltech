import React, { Component } from "react"

export class Diretorio {
    constructor() {
        this.id = "";
        this.nome = "";
    }
}

export class AddDiretorio extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", diretorio: new Diretorio(), loading: true };
        this.inicialize();
        this.handleSalvar = this.handleSalvar.bind(this);
    }

    async inicialize() {
        this.state = { title: "Criar", diretorio: new Diretorio(), loading: false };
    }

    render() {
        let contents = this.state.loading ? <p> <em> Carregando... </em></p> : this.renderCreateForm();

        return (
            <div>
                <h3>Adicionar Diretório</h3>
                {contents}
            </div>
        );
    }

    handleSalvar(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch("api/Diretorios/", { method: "POST", body: data });

        const location = {
            pathname: '/fetch-diretorio',
            state: { reload: true }
          }

        this.props.history.push(location);
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalvar}>
                
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="nome" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Salvar</button>
                </div>
            </form>
        );
    }
}