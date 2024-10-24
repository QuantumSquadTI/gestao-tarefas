import { IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Papeis } from "../entity/papel.entity";
import { UsuarioDto } from "./usuario.dto";

export class PapelDto{

    @IsNotEmpty()
    @IsEnum(Papeis)
    papel: Papeis;

    @IsArray()
    @IsOptional()
    usuarios?: Array<UsuarioDto>

    constructor(papel: Papeis, usuarios?: Array<UsuarioDto>) {
        this.papel = papel;
        this.usuarios = usuarios;
    }
}