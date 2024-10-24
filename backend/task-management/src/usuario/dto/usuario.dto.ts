import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PapelDto } from "./papel.dto";
import { TarefaDto } from "src/tarefa/dto/tarefa.dto";
import { EquipeDto } from "src/equipe/dto/equipe.dto";

export class UsuarioDto{

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsNotEmpty()
    papel: PapelDto;

    @IsArray()
    @IsNotEmpty()
    listaEquipes: Array<EquipeDto>;

    @IsArray()
    @IsNotEmpty()
    listaTarefas: Array<TarefaDto>;

    constructor(
        nome: string,
        email: string,
        senha: string,
        papel: PapelDto,
        listaEquipes: Array<EquipeDto>,
        listaTarefas: Array<TarefaDto>
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.papel = papel;
        this.listaEquipes = listaEquipes;
        this.listaTarefas = listaTarefas;
    }
}