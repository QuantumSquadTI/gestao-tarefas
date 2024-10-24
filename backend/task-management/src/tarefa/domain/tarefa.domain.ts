import { Equipe } from "src/equipe/domain/equipe.domain";
import { Status } from "./status.domain";
import { Usuario } from "src/usuario/domain/usuario.domain";

export class Tarefa{
    private _idTarefa: number;
    private _titulo: string;
    private _descricao: string;
    private _prazo: string;
    private _status: Status;
    private _equipe: Equipe;
    private _usuarios: Array<Usuario>;

    constructor(
        idTarefa: number,
        titulo: string,
        descricao: string,
        prazo: string,
        status: Status,
        equipe: Equipe,
        usuarios: Array<Usuario>
    ) {
        this._idTarefa = idTarefa;
        this._titulo = titulo;
        this._descricao = descricao;
        this._prazo = prazo;
        this._status = status;
        this._equipe = equipe;
        this._usuarios = usuarios;
    }

    //Métodos

    

    // Getters
    get getIdTarefa(): number {
        return this._idTarefa;
    }

    get getTitulo(): string {
        return this._titulo;
    }

    get getDescricao(): string {
        return this._descricao;
    }

    get getPrazo(): string {
        return this._prazo;
    }

    get getStatus(): Status {
        return this._status;
    }

    get getEquipe(): Equipe {
        return this._equipe;
    }

    get getUsuarios(): Usuario[] {
        return this._usuarios;
    }

    // Setters
    set setTitulo(titulo: string) {
        this._titulo = titulo;
    }

    set setDescricao(desc: string) {
        this._descricao = desc;
    }

    set setPrazo(prazo: string) {
        this._prazo = prazo;
    }

    set setStatus(status: Status) {
        this._status = status;
    }

    set setEquipe(equipe: Equipe) {
        this._equipe = equipe;
    }

    set setUsuarios(usuarios: Array<Usuario>) {
        this._usuarios = usuarios;
    }
}