import { IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Papeis } from "../entity/papel.entity";
import { UsuarioDto } from "./usuario.dto";

export class PapelDto{

    id: number;

    @IsNotEmpty()
    @IsEnum(Papeis)
    papel: Papeis;

    @IsArray()
    @IsOptional()
    usuarios?: Array<UsuarioDto>

    constructor(id: number, papel: Papeis, usuarios?: Array<UsuarioDto>) {
        this.id = id;
        this.papel = papel;
        this.usuarios = usuarios;
    }
}