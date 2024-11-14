import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UsuarioDto{
    
    @IsNumber()
    @IsOptional()
    idU: number;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsBoolean()
    @IsOptional()
    ativo?: boolean;

    constructor(
        idU: number,
        nome: string,
        email: string,
        senha: string,
        ativo: boolean = false,
    ) {
        this.idU = idU;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }
}