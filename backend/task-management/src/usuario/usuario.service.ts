import { Injectable } from "@nestjs/common";
import { Usuario } from "./domain/usuario.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./entity/usuario.entity";
import { UsuarioMapper } from "./usuario.mapper";
import { UsuarioNaoEncontradoException } from "src/exceptions/usuarioNaoEncontrado.exception";
import { UsuarioJaCadastradoException } from "src/exceptions/usuarioJaCadastrado.exception";
import { SenhaInvalidaException } from "src/exceptions/senhaInvalida.exception";
import { EmailService } from "src/email/email.service";
import { AppService } from "src/app.service";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        private readonly emailService: EmailService,
        private readonly appService: AppService
    ){}

    async cadastrar(novoUsuario: Usuario): Promise <Usuario>{
        // ---- Atributos
        const email = novoUsuario.getEmail;
        const senha = novoUsuario.getSenha;

        // ---- Lógica de ver se ja tem alguem registrado com o email
        const resultado: (Usuario | undefined) = UsuarioMapper.entityToDomain(
            await this.usuarioRepository.findOne({where: { email }})
        );

        if (resultado){
            throw new UsuarioJaCadastradoException();
        }

        // ---- Lógica de validar senha
        const senhaCerta :boolean = novoUsuario.validarSenha(senha);

        if (!senhaCerta) {
            throw new SenhaInvalidaException();
        }

        // ---- Enviar um email de confirmação
        const token = this.gerarToken(email)
        await this.emailService.emailConfirmarCadastro(email, token);

        // ---- Salva Usuario no sistema
        return UsuarioMapper.entityToDomain(
            await this.usuarioRepository.save(UsuarioMapper.domainToEntity(novoUsuario))
        )
    }

    async searchByEmail(email: string): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({where: { email }});
        if (!user) {
            throw new UsuarioNaoEncontradoException();
        }
        return UsuarioMapper.entityToDomain(user);
    }

    private gerarToken(email: string): string{
        const payload = { email };
        const segredo = 'G7@!pX8$uM^3kN2&rL6*qV1#tFzJ9zA';
        const opcoes = { expiresIn: '1h' }
    
        return jwt.sign(payload, segredo, opcoes)
    }

    async confirmarCadastro(token: string) {
        try {
            const segredo = 'G7@!pX8$uM^3kN2&rL6*qV1#tFzJ9zA';
            const payload = jwt.verify(token, segredo) as { email:string };
            
            const usuario = await this.usuarioRepository.findOne({ where: { email: payload.email } });
            
        } catch (error) {
            // Tratar erro (token inválido ou expirado)
        }
    }
}