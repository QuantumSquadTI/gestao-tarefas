import { Usuario } from "./domain/usuario.domain";
import { UsuarioEntity } from "./entity/usuario.entity";
import { UsuarioDto } from "./dto/usuario.dto";

export class UsuarioMapper{
    static entityToDomain(entity: UsuarioEntity): Usuario{
        // const papel: Papel[] = entity.papeis.map(papeis => PapelMapper.entityToDomain(papeis))

        return new Usuario(
            entity.idU,
            entity.nome,
            entity.email,
            entity.senha,
            entity.ativo
        )
    }

    static domainToEntity(domain: Usuario): UsuarioEntity{

        return new UsuarioEntity(
            domain.getNome,
            domain.getEmail,
            domain.getSenha,
            domain.isAtivo,
        )
    }

    static dtoToDomain(dto: UsuarioDto): Usuario{

        return new Usuario(
            dto.idU,
            dto.nome,
            dto.email,
            dto.senha,
            dto.ativo,
        );
    }

    static domainToDto(domain: Usuario): UsuarioDto{

        return new UsuarioDto(
            domain.getId,
            domain.getNome,
            domain.getEmail,
            domain.getSenha,
            domain.isAtivo,
        );
    }
}