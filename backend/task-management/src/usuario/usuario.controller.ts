import { Body, Controller, Get, Post, Res, HttpStatus, Response, HttpCode, HttpException, Query } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "./dto/usuario.dto";
import { UsuarioMapper } from "./usuario.mapper";

@Controller("usuario")
export class UsuarioController{
    
    constructor(
        private usuarioService: UsuarioService
    ){}
    
    @Post("")
    @HttpCode(HttpStatus.CREATED)
    async cadastrar(@Body() novoUsuario: UsuarioDto) {

        try{
            const usuarioRegistrado: UsuarioDto = UsuarioMapper.domainToDto(
                await this.usuarioService.cadastrar(UsuarioMapper.dtoToDomain(novoUsuario))
            )

            const location = `/usuario/cadastrar/${usuarioRegistrado.idU}`;

            return {
                statusCode: HttpStatus.CREATED,
                message: "Usuário cadastrado com sucesso",
                data: usuarioRegistrado,
                location
            };
        }catch(error){
            console.error("Erro ao cadastrar usuário:", error);
            throw new HttpException("Erro ao cadastrar usuário", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('confirmar-cadastro')
    async confirmarCadastro(@Query('token') token: string){
        if (!token){
            throw new HttpException("Token não encontrado", HttpStatus.BAD_REQUEST)
        }

        return await this.usuarioService.confirmarCadastro(token)
    }
}