import { Usuario } from "src/usuario/domain/usuario.domain";
import { Equipe } from "./domain/equipe.domain";
import { EquipeDto } from "./dto/equipe.dto";
import { EquipeEntity } from "./entity/equipe.entity";
import { Tarefa } from "src/tarefa/domain/tarefa.domain";
import { UsuarioMapper } from "src/usuario/usuario.mapper";
import { TarefaMapper } from "src/tarefa/tarefa.mapper";
import { UsuarioEntity } from "src/usuario/entity/usuario.entity";
import { TarefaEntity } from "src/tarefa/entity/tarefa.entity";
import { UsuarioDto } from "src/usuario/dto/usuario.dto";
import { TarefaDto } from "src/tarefa/dto/tarefa.dto";

export class EquipeMapper{
    static entityToDomain(entity: EquipeEntity): Equipe{
        const usuarios: Array<Usuario> = entity.usuarios.map(usuario => UsuarioMapper.entityToDomain(usuario));
        const tarefas: Array<Tarefa> = entity.tarefas.map(tarefa => TarefaMapper.entityToDomain(tarefa));

        return new Equipe(
            entity.id,
            entity.nome,
            entity.descricao,
            entity.fotoPerfil,
            usuarios,
            tarefas
        );
    }

    static domainToEntity(domain: Equipe): EquipeEntity{
        const usuarios: Array<UsuarioEntity> = domain.getUsuarios.map(usuario => UsuarioMapper.domainToEntity(usuario));
        const tarefas: Array<TarefaEntity> = domain.getTarefas.map(tarefa => TarefaMapper.domainToEntity(tarefa));

        return new EquipeEntity(
            domain.getNome,
            domain.getDescricao,
            domain.getFotoPerfil,
            usuarios,
            tarefas
        );
    }

    static dtoToDomain(dto: EquipeDto): Equipe{
        const usuarios: Array<Usuario> = dto.usuarios.map(usuarioDto => UsuarioMapper.dtoToDomain(usuarioDto));
        const tarefas: Array<Tarefa> = dto.tarefas.map(tarefaDto => TarefaMapper.dtoToDomain(tarefaDto));

        return new Equipe(
            dto.id,
            dto.nome,
            dto.descricao,
            dto.fotoPerfil,
            usuarios,
            tarefas
        );
    }

    static domainToDto(domain: Equipe): EquipeDto{
        const usuarios: Array<UsuarioDto> = domain.getUsuarios.map(usuario => UsuarioMapper.domainToDto(usuario));
        const tarefas: Array<TarefaDto> = domain.getTarefas.map(tarefa => TarefaMapper.domainToDto(tarefa));

        return new EquipeDto(
            domain.getId,
            domain.getNome,
            domain.getDescricao,
            domain.getFotoPerfil,
            usuarios,
            tarefas
        );
    }
}