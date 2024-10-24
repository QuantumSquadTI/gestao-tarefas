import { IsNotEmpty, IsString } from "class-validator"
import { Usuario } from "src/usuario/domain/usuario.domain"

export class EquipeDto{
    
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsString()
    @IsNotEmpty()
    fotoPerfil: string


    usuarios: Array<Usuario>
}