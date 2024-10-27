import { Equipe } from "src/equipe/domain/equipe.domain"
import { Papel } from "./papel.domain"
import { Tarefa } from "src/tarefa/domain/tarefa.domain";

export class Usuario{
    private _id: number;
    private _nome: string;
    private _email: string;
    private _senha: string;
    private _papel: Papel;
    private _listaEquipes: Array<Equipe>;
    private _listaTarefas: Array<Tarefa>;

    constructor(
        id: number,
        nome: string,
        email: string,
        senha: string,
        papel: Papel,
        listaEquipes: Array<Equipe> = [],
        listaTarefas: Array<Tarefa> = []

    ) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._papel = papel;
        this._listaEquipes = listaEquipes;
        this._listaTarefas = listaTarefas;
    }

    //Métodos



    //GETTERs
    get getId(): number {
        return this._id;
    }

    get getNome(): string {
        return this._nome;
    }

    get getEmail(): string {
        return this._email;
    }

    get getSenha(): string {
        return this._senha;
    }

    get getPapel(): Papel {
        return this._papel;
    }

    get getListaEquipes(): Array<Equipe> {
        return this._listaEquipes;
    }

    get getListaTarefas(): Array<Tarefa> {
        return this._listaTarefas;
    }

    //SETTERs
    set setNome(nome: string) {
        this._nome = nome;
    }

    set setEmail(email: string) {
        this._email = email;
    }

    set setSenha(senha: string) {
        this._senha = senha;
    }

    set setPapel(papel: Papel) {
        this._papel = papel;
    }

    set setListaEquipes(lista: Array<Equipe>) {
        this._listaEquipes = lista;
    }

    set setListaTarefas(lista: Array<Tarefa>) {
        this._listaTarefas = lista;
    }
}