import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Equipe } from "src/equipe/domain/equipe.domain"

export class UsuarioDto{

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    senha: string

    listaEquipes: Array<Equipe>
}