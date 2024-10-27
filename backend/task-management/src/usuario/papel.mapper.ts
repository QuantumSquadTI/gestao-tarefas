import { Papel } from "./domain/papel.domain";
import { Usuario } from "./domain/usuario.domain";
import { PapelDto } from "./dto/papel.dto";
import { UsuarioDto } from "./dto/usuario.dto";
import { PapelEntity } from "./entity/papel.entity";
import { UsuarioEntity } from "./entity/usuario.entity";
import { UsuarioMapper } from "./usuario.mapper";

export class PapelMapper{
    static entityToDomain(entity: PapelEntity): Papel{
        const usuarios: Array<Usuario> = entity.usuario.map(usuario => UsuarioMapper.entityToDomain(usuario));
        
        return new Papel(
            entity.idPapel,
            entity.papel,
            usuarios
        );
    }

    static domainToEntity(domain: Papel): PapelEntity{
        const usuarios: Array<UsuarioEntity> = domain.getUsuarios.map(usuario => UsuarioMapper.domainToEntity(usuario));

        return new PapelEntity(
            domain.getPapel,
            usuarios
        );
    }

    static dtoToDomain(dto: PapelDto): Papel{
        const usuarios: Array<Usuario> = dto.usuarios.map(usuarioDto => UsuarioMapper.dtoToDomain(usuarioDto));

        return new Papel(
            dto.id,
            dto.papel,
            usuarios
        );
    }

    static domainToDto(domain: Papel): PapelDto{
        const usuarios: Array<UsuarioDto> = domain.getUsuarios.map(usuario => UsuarioMapper.domainToDto(usuario));

        return new PapelDto(
            domain.getId,
            domain.getPapel,
            usuarios
        );
    }
}