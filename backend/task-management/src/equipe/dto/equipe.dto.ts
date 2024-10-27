import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { TarefaDto } from "src/tarefa/dto/tarefa.dto"
import { UsuarioDto } from "src/usuario/dto/usuario.dto"

export class EquipeDto{

    id: number;
    
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    descricao: string

    @IsString()
    @IsNotEmpty()
    fotoPerfil: string

    @IsArray()
    @IsNotEmpty()
    usuarios: Array<UsuarioDto>

    @IsArray()
    @IsNotEmpty()
    tarefas: Array<TarefaDto>;

    constructor(
        id: number,
        nome: string, 
        descricao: string, 
        fotoPerfil: string, 
        usuarios: Array<UsuarioDto>,
        tarefas: Array<TarefaDto>
    ) {
        this.id = id,
        this.nome = nome;
        this.descricao = descricao;
        this.fotoPerfil = fotoPerfil;
        this.usuarios = usuarios;
        this.tarefas = tarefas;
    }
}