import { Usuario } from "src/usuario/domain/usuario.domain"

export class Equipe{
    id: number
    nome: string
    descricao: string
    fotoPerfil: string
    usuarios: Array<Usuario>
}