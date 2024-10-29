import { Injectable } from "@nestjs/common";
import { Usuario } from "./domain/usuario.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ){}

    

    cadastrar(novoUsuario: Usuario): Usuario{


        //Verificar se ja tem um email no repositorio
        /*Validar senha (
            - Mínimo: 8 letras,
            - Obter letras maiusculas,
            - Obter letras minúsculas,
            - Obter número.
        )*/
        //Enviar um email para o cara
        //Verificar se tem acesso completo ao sistema.

        return Usuario;
    }

    async function searchByEmail(email: string): Promise<Usuario | undefined> {
        const user = await this.usuarioRepository.findOne({ email });
        if (!user) {
            throw new UserNotFoundException({
                statuscode: 404,
                message: "Nao deu"
            });
        }
        return user;
    }
}