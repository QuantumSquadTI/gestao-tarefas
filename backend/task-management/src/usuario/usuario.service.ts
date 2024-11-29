import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "./domain/usuario.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioMapper } from "./usuario.mapper";
import { EmailService } from "src/email/email.service";
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from "./entity/usuario.entity";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly emailService: EmailService
    ){}

    async cadastrar(novoUsuario: Usuario): Promise <Usuario>{
        
        const email = novoUsuario.getEmail;
        const senha = novoUsuario.getSenha;

        const resultado: (UsuarioEntity | undefined) = await this.usuarioRepository.findOne({where: { email }})

        if (resultado){
            throw new HttpException("Usuario já cadastrado", HttpStatus.CONFLICT);
        }

        const senhaCerta :boolean = novoUsuario.validarSenha(senha);

        if (!senhaCerta) {
            throw new HttpException("Senha inválida", HttpStatus.BAD_REQUEST);
        }

        const token = this.gerarToken(email)
        await this.emailService.emailConfirmarCadastro(email, token);

        return UsuarioMapper.entityToDomain(
            await this.usuarioRepository.save(UsuarioMapper.domainToEntity(novoUsuario))
        )
    }

    async login(email: string, senha: string): Promise<string> {
        const usuario = this.buscarPorEmail(email)

        if (!(await usuario).isAtivo){       
            throw new HttpException("Usuário não está confirmado", HttpStatus.UNAUTHORIZED);
        }

        if ((await usuario).getSenha !== senha){
            throw new HttpException("Senha errada", HttpStatus.UNAUTHORIZED);
        }
    
        const token = this.gerarToken(email, (await usuario).getId);
    
        return token;
    }

    private tokensInvalidos: Set<string> = new Set();

    async invalidarToken(token: string): Promise<void> {
        this.tokensInvalidos.add(token);
    }

    isTokenInvalido(token: string): boolean {
        return this.tokensInvalidos.has(token); 
    }

    async buscarPorEmail(email: string): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({where: { email }});
        if (!user) {
            throw new HttpException("Email não encontrado" ,HttpStatus.NOT_FOUND);
        }
        return UsuarioMapper.entityToDomain(user);
    }

    async buscarPorId(idU: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({where: { idU }});
        if (!user) {
            throw new HttpException("Usuário não encontrado" ,HttpStatus.NOT_FOUND);
        }
        return UsuarioMapper.entityToDomain(user);
    }

    async confirmarCadastro(token: string) {
        try {       
            
            const segredo = 'G7@!pX8$uM^3kN2&rL6*qV1#tFzJ9zA';
            const payload = jwt.verify(token, segredo) as { email:string };
            console.log(payload);
               
            const usuario: Usuario = await this.buscarPorEmail(payload.email);

            if (usuario.isAtivo) {
                throw new HttpException('Usuário já confirmado', HttpStatus.BAD_REQUEST);
            }

            await this.usuarioRepository.update({email: payload.email}, {ativo: true});
            const usuarioAtualizado: Usuario = await this.buscarPorEmail(payload.email);

            return {
                message:"Confirmação de cadastro bem sucedida!",
                statusCode: HttpStatus.OK,
                data: usuarioAtualizado,
            }
            
        } catch (error) {
            throw new HttpException('Erro ao confirmar cadastro', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deletarUsuario(idU: number){
        await this.usuarioRepository.delete(idU);
    }

    private gerarToken(email: string, idU?: number): string{
        const payload = { email, idU };
        const segredo = 'G7@!pX8$uM^3kN2&rL6*qV1#tFzJ9zA';
        const opcoes = { expiresIn: '1h' }
    
        return jwt.sign(payload, segredo, opcoes)
    }
}