export class Usuario{
    private _idU: number;
    private _nome: string;
    private _email: string;
    private _senha: string;
    private _ativo?: boolean;

    constructor(
        idU: number,
        nome: string,
        email: string,
        senha: string,
        ativo?: boolean,
    ) {
        this._idU = idU;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._ativo = ativo;
    }

    //Métodos
    validarSenha(senha: string): boolean{
        const temMaiusc: boolean = senha.match(/[A-Z]/) !== null;
        const temMinusc: boolean = senha.match(/[a-z]/) !== null;
        const temNumero: boolean = senha.match(/[0-9]/) !== null;

        if (senha.length >= 8 && temMaiusc && temMinusc && temNumero){
            return true;
        }else{
            return false;
        }
    }


    //GETTERs
    get getId(): number {
        return this._idU;
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

    get isAtivo(): boolean {
        return this._ativo;
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

    set setAtivo(ativo: boolean) {
        this._ativo = ativo;
    }
}