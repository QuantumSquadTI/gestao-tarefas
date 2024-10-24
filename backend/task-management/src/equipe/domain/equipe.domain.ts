import { Tarefa } from "src/tarefa/domain/tarefa.domain";
import { Usuario } from "src/usuario/domain/usuario.domain"

export class Equipe{
    private _id: number;
    private _nome: string;
    private _descricao: string;
    private _fotoPerfil: string;
    private _usuarios: Array<Usuario>;
    private _tarefas: Array<Tarefa>;

    constructor(
        id: number,
        nome: string,
        descricao: string,
        fotoPerfil: string,
        usuarios: Array<Usuario> = [],
        tarefas: Array<Tarefa> = []
    ) {
        this._id = id;
        this._nome = nome;
        this._descricao = descricao;
        this._fotoPerfil = fotoPerfil;
        this._usuarios = usuarios;
        this._tarefas = tarefas;
    }

    //Métodos



    // GETTERs
    get getId(): number {
        return this._id;
    }

    get getNome(): string {
        return this._nome;
    }

    get getDescricao(): string {
        return this._descricao;
    }

    get getFotoPerfil(): string {
        return this._fotoPerfil;
    }

    get getUsuarios(): Array<Usuario> {
        return this._usuarios;
    }

    get getTarefas(): Array<Tarefa> {
        return this._tarefas;
    }
    
    // SETTERs
    set setNome(nome: string) {
        this._nome = nome;
    }

    set setDescricao(desc: string) {
        this._descricao = desc;
    }

    set setFotoPerfil(fotoPerfil: string) {
        this._fotoPerfil = fotoPerfil;
    }

    set setUsuarios(usuarios: Array<Usuario>) {
        this._usuarios = usuarios;
    }

    set setTarefas(tarefas: Array<Tarefa>) {
        this._tarefas = tarefas;
    }
}