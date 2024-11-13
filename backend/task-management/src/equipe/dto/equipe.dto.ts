import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EquipeDto{

    @IsNumber()
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
        idE: number,
        nome: string, 
        descricao: string, 
        fotoEquipe: string, 
    ) {
        this.idE = idE,
        this.nome = nome;
        this.descricao = descricao;
        this.fotoEquipe = fotoEquipe;
    }
}