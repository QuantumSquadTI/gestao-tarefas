import { Equipe } from "src/equipe/domain/equipe.domain";
import { Papel } from "./domain/papel.domain";
import { Usuario } from "./domain/usuario.domain";
import { UsuarioEntity } from "./entity/usuario.entity";
import { PapelMapper } from "./papel.mapper";
import { EquipeMapper } from "src/equipe/equipe.mapper";
import { Tarefa } from "src/tarefa/domain/tarefa.domain";
import { TarefaMapper } from "src/tarefa/tarefa.mapper";
import { PapelEntity } from "./entity/papel.entity";
import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { TarefaEntity } from "src/tarefa/entity/tarefa.entity";
import { UsuarioDto } from "./dto/usuario.dto";
import { PapelDto } from "./dto/papel.dto";
import { EquipeDto } from "src/equipe/dto/equipe.dto";
import { TarefaDto } from "src/tarefa/dto/tarefa.dto";

export class UsuarioMapper{
    static entityToDomain(entity: UsuarioEntity): Usuario{
        const papel: Papel = PapelMapper.entityToDomain(entity.papel)
        const equipes: Array<Equipe> = entity.equipes.map(equipes => EquipeMapper.entityToDomain(equipes))
        const tarefas: Array<Tarefa> = entity.tarefas.map(tarefa => TarefaMapper.entityToDomain(tarefa))

        return new Usuario(
            entity.idUser,
            entity.nome,
            entity.email,
            entity.senha,
            papel,
            equipes,
            tarefas
        )
    }

    static domainToEntity(domain: Usuario): UsuarioEntity{
        const papel: PapelEntity = PapelMapper.domainToEntity(domain.getPapel)
        const equipes: Array<EquipeEntity> = domain.getListaEquipes.map(equipes => EquipeMapper.domainToEntity(equipes))
        const tarefas: Array<TarefaEntity> = domain.getListaTarefas.map(tarefa => TarefaMapper.domainToEntity(tarefa))

        return new UsuarioEntity(
            domain.getNome,
            domain.getEmail,
            domain.getSenha,
            papel,
            equipes,
            tarefas
        )
    }

    static dtoToDomain(dto: UsuarioDto): Usuario{
        const papel: Papel = PapelMapper.dtoToDomain(dto.papel);
        const equipes: Array<Equipe> = dto.listaEquipes.map(equipeDto => EquipeMapper.dtoToDomain(equipeDto));
        const tarefas: Array<Tarefa> = dto.listaTarefas.map(tarefaDto => TarefaMapper.dtoToDomain(tarefaDto));

        return new Usuario(
            dto.id,
            dto.nome,
            dto.email,
            dto.senha,
            papel,
            equipes,
            tarefas
        );
    }

    static domainToDto(domain: Usuario): UsuarioDto{
        const papel: PapelDto = PapelMapper.domainToDto(domain.getPapel);
        const equipes: Array<EquipeDto> = domain.getListaEquipes.map(equipe => EquipeMapper.domainToDto(equipe));
        const tarefas: Array<TarefaDto> = domain.getListaTarefas.map(tarefa => TarefaMapper.domainToDto(tarefa));

        return new UsuarioDto(
            domain.getId,
            domain.getNome,
            domain.getEmail,
            domain.getSenha,
            papel,
            equipes,
            tarefas
        );
    }
}