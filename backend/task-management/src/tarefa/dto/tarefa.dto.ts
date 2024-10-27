import { IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator"
import { StatusDto } from "./status.dto";
import { EquipeDto } from "src/equipe/dto/equipe.dto";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";

export class TarefaDto{

    id: number;

    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsDateString()
    @IsNotEmpty()
    prazo: string;

    @IsNotEmpty()
    status: StatusDto;

    @IsNotEmpty()
    equipe: EquipeDto;

    @IsArray()
    @IsNotEmpty()
    usuarios: Array<UsuarioDto>;

    constructor(
        id: number,
        titulo: string,
        descricao: string,
        prazo: string,
        status: StatusDto,
        equipe: EquipeDto,
        usuarios: Array<UsuarioDto>
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.prazo = prazo;
        this.status = status;
        this.equipe = equipe;
        this.usuarios = usuarios;
    }
}