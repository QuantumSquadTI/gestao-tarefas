import { Equipe } from "src/equipe/domain/equipe.domain"

export class UsuarioDto{
    //Adicionar validators aqui
    nome: string
    email: string
    senha: string
    listaEquipes: Array<Equipe>
}