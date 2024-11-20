import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "./domain/usuario.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioMapper } from "./usuario.mapper";
import { EmailService } from "src/email/email.service";
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from "./entity/usuario.entity";
import { log } from "console";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly emailService: EmailService
    ){}

    // ---- CADASTRAR
    async cadastrar(novoUsuario: Usuario): Promise <Usuario>{
        // ---- Atributos
        const email = novoUsuario.getEmail;
        console.log(email)
        const senha = novoUsuario.getSenha;

        // ---- Lógica de ver se ja tem alguem registrado com o email
        const resultado: (UsuarioEntity | undefined) = await this.usuarioRepository.findOne({where: { email }})

        if (resultado){
            throw new HttpException("Usuario já cadastrado", HttpStatus.CONFLICT);
        }

        // ---- Lógica de validar senha
        const senhaCerta :boolean = novoUsuario.validarSenha(senha);

        if (!senhaCerta) {
            throw new HttpException("Senha inválida", HttpStatus.BAD_REQUEST);
        }

        // ---- Enviar um email de confirmação
        const token = this.gerarToken(email)
        await this.emailService.emailConfirmarCadastro(email, token);

        // ---- Salva Usuario no sistema
        return UsuarioMapper.entityToDomain(
            await this.usuarioRepository.save(UsuarioMapper.domainToEntity(novoUsuario))
        )
    }

    // ---- LOGIN
    async login(email: string, senha: string): Promise<string> {
        // ---- Verifica se o email existe no sistema
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
    
        if (!usuario) {
            throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }
    
        // ---- Valida a senha
        if (usuario.senha !== senha){
            throw new HttpException("Senha errada", HttpStatus.UNAUTHORIZED);
        }
    
        // ---- Gera um token JWT para autenticação
        const token = this.gerarToken(email);
    
        // ---- Retorna o token (ou outras informações se necessário)
        return token;
    }

     //----LOGOUT
    private tokensInvalidos: Set<string> = new Set(); // Armazena tokens inválidos

    // Função para invalidar o token
    async invalidarToken(token: string): Promise<void> {
        this.tokensInvalidos.add(token);
    }

    // Função para verificar se o token é inválido
    isTokenInvalido(token: string): boolean {
        return this.tokensInvalidos.has(token); 
    }


    async buscarPorEmail(email: string): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({where: { email }});
        if (!user) {
            throw new HttpException("Usuário não encontrado" ,HttpStatus.NOT_FOUND);
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
            // ---- Atributos
            
            
            const segredo = 'G7@!pX8$uM^3kN2&rL6*qV1#tFzJ9zA';
            const payload = jwt.verify(token, segredo) as { email:string };
            console.log(payload);
            
            
            // ---- Buscando Usuario
            const usuario: Usuario = await this.buscarPorEmail(payload.email);

            // ---- Se já estiver ativo
            if (usuario.isAtivo) {
                throw new HttpException('Usuário já confirmado', HttpStatus.BAD_REQUEST);
            }

            // ---- Torná-lo ativo
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

    private gerarToken(email: string): string{
        const payload = { email };
        const segredo = 'G7@!pX8$uM^3kN2&rL6*qV1#tFzJ9zA';
        const opcoes = { expiresIn: '1h' }
    
        return jwt.sign(payload, segredo, opcoes)
    }
}