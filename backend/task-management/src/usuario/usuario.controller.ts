import { Body, Controller, Get, Post, Res, HttpStatus, Response, HttpCode, HttpException, Query, Delete, Param } from "@nestjs/common";
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

            return {
                statusCode: HttpStatus.CREATED,
                message: "Usuário cadastrado com sucesso",
                data: usuarioRegistrado,
            };
        }catch(error){
            console.error("Erro ao cadastrar usuário:", error);
            throw new HttpException("Erro ao cadastrar usuário", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


// LOGIN
    @Post("login")
    @HttpCode(HttpStatus.OK) 
    async login(@Body() logiUsuarioDto: { email: string; senha: string }) {
        try {
            // Chama o serviço de login e obtém o token JWT
            const token = await this.usuarioService.login(logiUsuarioDto.email, logiUsuarioDto.senha);
    
            // Retorna a resposta de sucesso com o token
            return {
                statusCode: HttpStatus.OK,
                message: "Login realizado com sucesso",
                data: { token },
            };
        } catch (error) {
            console.error("Erro ao realizar login:", error);
    
            // Lança o erro, que será tratado pelo NestJS
            throw new HttpException(
                error.message || "Erro ao realizar login",
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    //LOGOUT
    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout(@Body() body: { token: string }) {
        try {
            await this.usuarioService.invalidarToken(body.token);
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

    @Get('confirmar-cadastro')
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