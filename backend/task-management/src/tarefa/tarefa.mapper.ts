import { Equipe } from "src/equipe/domain/equipe.domain";
import { Status } from "./domain/status.domain";
import { Tarefa } from "./domain/tarefa.domain";
import { TarefaDto } from "./dto/tarefa.dto";
import { TarefaEntity } from "./entity/tarefa.entity";
import { Usuario } from "src/usuario/domain/usuario.domain";
import { StatusMapper } from "./status.mapper";
import { EquipeMapper } from "src/equipe/equipe.mapper";
import { UsuarioMapper } from "src/usuario/usuario.mapper";
import { StatusEntity } from "./entity/status.entity";
import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { UsuarioEntity } from "src/usuario/entity/usuario.entity";
import { StatusDto } from "./dto/status.dto";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";
import { EquipeDto } from "src/equipe/dto/equipe.dto";

export class TarefaMapper{
    static entityToDomain(entity: TarefaEntity): Tarefa{
        const status: Status = StatusMapper.entityToDomain(entity.status);
        const equipe: Equipe = EquipeMapper.entityToDomain(entity.equipe);
        const usuarios: Array<Usuario> = entity.usuario.map(usuario => UsuarioMapper.entityToDomain(usuario));

        return new Tarefa(
            entity.idTarefa,
            entity.titulo,
            entity.descricao,
            entity.prazo,
            status,
            equipe,
            usuarios
        );
    }

    static domainToEntity(domain: Tarefa): TarefaEntity{
        const status: StatusEntity = StatusMapper.domainToEntity(domain.getStatus);
        const equipe: EquipeEntity = EquipeMapper.domainToEntity(domain.getEquipe);
        const usuarios: Array<UsuarioEntity> = domain.getUsuarios.map(usuario => UsuarioMapper.domainToEntity(usuario));

        return new TarefaEntity(
            domain.getTitulo,
            domain.getDescricao,
            domain.getPrazo,
            status,
            equipe,
            usuarios
        )
    }

    static dtoToDomain(dto: TarefaDto): Tarefa{
        const status: Status = StatusMapper.dtoToDomain(dto.status);
        const equipe: Equipe = EquipeMapper.dtoToDomain(dto.equipe);
        const usuarios: Array<Usuario> = dto.usuarios.map(usuarioDto => UsuarioMapper.dtoToDomain(usuarioDto));

        return new Tarefa(
            dto.id,
            dto.titulo,
            dto.descricao,
            dto.prazo,
            status,
            equipe,
            usuarios
        );
    }

    static domainToDto(domain: Tarefa): TarefaDto{
        const status: StatusDto = StatusMapper.domainToDto(domain.getStatus);
        const equipe: EquipeDto = EquipeMapper.domainToDto(domain.getEquipe);
        const usuarios: Array<UsuarioDto> = domain.getUsuarios.map(usuario => UsuarioMapper.domainToDto(usuario));

        return new TarefaDto(
            domain.getIdTarefa,
            domain.getTitulo,
            domain.getDescricao,
            domain.getPrazo,
            status,
            equipe,
            usuarios
        );
    }
}