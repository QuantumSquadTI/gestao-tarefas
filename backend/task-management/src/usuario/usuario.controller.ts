import { Body, Controller, Get, Post, HttpStatus, HttpCode, HttpException, Query, Delete, Param, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "./dto/usuario.dto";
import { UsuarioMapper } from "./usuario.mapper";
import { LoginUsuarioDto } from "./dto/loginUsuario.dto";


@Controller("usuario")
export class UsuarioController{
    
    constructor(
        private usuarioService: UsuarioService
    ){}
    
    @Post("")
    @HttpCode(HttpStatus.CREATED)
    async cadastrar(@Body() novoUsuario: UsuarioDto) {
        const usuarioRegistrado: UsuarioDto = UsuarioMapper.domainToDto(
            await this.usuarioService.cadastrar(UsuarioMapper.dtoToDomain(novoUsuario))
        )

        return {
            statusCode: HttpStatus.CREATED,
            message: "Usuário cadastrado com sucesso",
            data: usuarioRegistrado,
        };
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUsuarioDto: LoginUsuarioDto) {
        const token = await this.usuarioService.login(loginUsuarioDto.email, loginUsuarioDto.senha);

        return {
            statusCode: HttpStatus.OK,
            message: "Login realizado com sucesso",
            data: token
        };
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout(@Body() token: string) {
        console.log("ola")
        try {
            await this.usuarioService.invalidarToken(token);
            return {
                statusCode: HttpStatus.OK,
                message: "Logout realizado com sucesso",
            };
        } catch (error) {
            console.error("Erro ao realizar logout:", error);
            throw new HttpException(
                "Erro ao realizar logout",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put('confirmar-cadastro')
    async confirmarCadastro(@Query('token') token: string){
        if (!token){
            throw new HttpException("Token não encontrado", HttpStatus.BAD_REQUEST)
        }
        
        return await this.usuarioService.confirmarCadastro(token)
    }

    @Get(':email')
    async buscarPorEmail(@Param('email') email: string){
        const usuario: UsuarioDto = UsuarioMapper.domainToDto(
            await this.usuarioService.buscarPorEmail(email)
        );

        return {
            statusCode: HttpStatus.OK,
            message: "Usuário encontrado com sucesso",
            data: usuario
        }
    }

    @Delete(':id')
    async deletarUsuario(@Param('id') id: number) {
        this.usuarioService.deletarUsuario(id);

        return {
            statusCode: HttpStatus.OK,
            message: "Usuário deletado com sucesso."
        }
    }
}