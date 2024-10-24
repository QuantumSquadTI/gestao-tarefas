import { Papeis } from "../entity/papel.entity"
import { Usuario } from "./usuario.domain";

export class Papel{
    private _id: number;
    private _papel: Papeis;
    private _usuarios: Array<Usuario>;

    constructor(id: number, papel: Papeis, usuarios: Array<Usuario> = []){
        this._id = id;
        this._papel = papel;
        this._usuarios = usuarios;
    }

    //Métodos

    

    //GETTERs

    get getId(): number{
        return this._id;
    }

    get getPapel(): Papeis{
        return this._papel;
    }

    get getUsuarios(): Array<Usuario> {
        return this._usuarios;
    }

    get isAdmin(): boolean {
        return this._papel === Papeis.ADMINISTRADOR;
    }

    get isColaborador(): boolean {
        return this._papel === Papeis.COLABORADOR;
    }

    //SETTERs

    set setPapel(papel: Papeis){
        this._papel = papel;
    }

    set setUsuarios(usuario: Array<Usuario>) {
        this._usuarios = usuario;
    }
}