export class Equipe{
    private _id: number;
    private _nome: string;
    private _descricao: string;
    private _fotoEquipe: string;

    constructor(
        id: number,
        nome: string,
        descricao: string,
        fotoEquipe: string,
    ) {
        this._id = id;
        this._nome = nome;
        this._descricao = descricao;
        this._fotoEquipe = fotoEquipe;
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

    get getFotoEquipe(): string {
        return this._fotoEquipe;
    }
    
    // SETTERs
    set setNome(nome: string) {
        this._nome = nome;
    }

    set setDescricao(desc: string) {
        this._descricao = desc;
    }

    set setFotoEquipe(fotoEquipe: string) {
        this._fotoEquipe = fotoEquipe;
    }
}