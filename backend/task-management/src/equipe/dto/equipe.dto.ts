import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class EquipeDto{

    @IsNumber()
    @IsOptional()
    idE: number;
    
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsString()
    @IsOptional()
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