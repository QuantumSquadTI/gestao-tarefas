import { Body, Controller, Get, Post, Res, HttpStatus, Response, HttpCode, HttpException } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "./dto/usuario.dto";
import { UsuarioMapper } from "./usuario.mapper";

@Controller("usuario")
export class UsuarioController{
    
    constructor(
        private usuarioService: UsuarioService
    ){}
    
    @Post("cadastrar")
    @HttpCode(HttpStatus.CREATED)
    async cadastrar(@Body() novoUsuario: UsuarioDto) {

        try{
            const usuarioRegistrado: UsuarioDto = UsuarioMapper.domainToDto(
                await this.usuarioService.cadastrar(UsuarioMapper.dtoToDomain(novoUsuario))
            );

            const location = `/usuario/cadastrar/${usuarioRegistrado.id}`;

            return {
                statusCode: HttpStatus.CREATED,
                message: "Usuário cadastrado com sucesso",
                data: usuarioRegistrado,
                location
            };
        }catch(error){
            throw new HttpException(
                {
                    statuscode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message || "Erro ao cadastrar usuário",
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}