import { Equipe } from "src/equipe/domain/equipe.domain"

export class Usuario{
    id: number
    nome: string
    email: string
    senha: string
    listaEquipes: Array<Equipe>

    constructor(

    ){}

    validarEmail(){}

    validarSenha(){}

    verificarEmail(){}

    verificarSenha(){}

    limiteEquipes(){}
}