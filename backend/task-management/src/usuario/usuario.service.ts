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


@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        private readonly emailService: EmailService
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
        const token = 'token gerado'
        await this.emailService.enviarEmailDeConfirmacao(email, token);


        //Enviar um email para o cara
        //Verificar se tem acesso completo ao sistema.

        return Usuario;
    }

    async searchByEmail(email: string): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({where: { email }});
        if (!user) {
            throw new UsuarioNaoEncontradoException();
        }
        return UsuarioMapper.entityToDomain(user);
    }
}