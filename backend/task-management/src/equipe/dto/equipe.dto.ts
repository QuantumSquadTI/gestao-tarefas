<<<<<<< HEAD
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
=======
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
>>>>>>> bca87ce48669797038284a8edc0f1a830ff2dd6a

export class EquipeDto{

    @IsNumber()
<<<<<<< HEAD
    @IsOptional()
=======
>>>>>>> bca87ce48669797038284a8edc0f1a830ff2dd6a
    idE: number;
    
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsString()
    @IsNotEmpty()
    fotoEquipe: string

    constructor(
        nome: string, 
        descricao: string, 
        fotoEquipe: string, 
        idE?: number,
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.fotoEquipe = fotoEquipe;
        this.idE = idE
    }
}