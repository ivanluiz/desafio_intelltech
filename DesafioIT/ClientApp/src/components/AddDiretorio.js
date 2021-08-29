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
    }

    async inicialize() {
        var id = this.props.match.params["id"];

        if (id != null) { //testar as duas possibilidades
            const response = await fetch('api/Diretorios' + id);
            const data = await response.json();
            this.setState({ title: "Edit", diretorio: data, loading: false });
        }
        else
            this.state = { title: "Create", diretorio: new Diretorio(), loading: false };
    }

    render() {
        let contents = this.state.loading ? <p> <em> Carregando... </em></p> : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Diretório</h3>
                {contents}
            </div>
        );
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("fetch-diretorio");
    }

    handleSalvar(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        if (this.state.diretorio.id) {
            const response1 = fetch("api/Diretorios/" + this.state.diretorio.id, { method: "PUT", body: data });
            this.props.history.push("fetch-diretorio");
        }
        else {
            const response2 = fetch("api/Diretorios/", { method: "POST", body: data });
            this.props.history.push("fetch-diretorio");
        }
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalvar}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.diretorio.id}/>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="nome" defaultValue={this.state.diretorio.nome}/>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.diretorio.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>
            );
    }
}