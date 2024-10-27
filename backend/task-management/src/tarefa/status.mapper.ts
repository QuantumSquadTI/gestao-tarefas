import { Status } from "./domain/status.domain"
import { Tarefa } from "./domain/tarefa.domain";
import { StatusDto } from "./dto/status.dto"
import { TarefaDto } from "./dto/tarefa.dto";
import { StatusEntity } from "./entity/status.entity"
import { TarefaEntity } from "./entity/tarefa.entity";
import { TarefaMapper } from "./tarefa.mapper";

export class StatusMapper{
    static entityToDomain(entity: StatusEntity): Status{
        const tarefas: Array<Tarefa> = entity.tarefas.map(tarefa => TarefaMapper.entityToDomain(tarefa));

        return new Status(
            entity.id,
            entity.status,
            tarefas
        );
    }
    
    static domainToEntity(domain: Status): StatusEntity{
        const tarefas: Array<TarefaEntity> = domain.getTarefas.map(tarefa => TarefaMapper.domainToEntity(tarefa));

        return new StatusEntity(
            domain.getStatus,
            tarefas
        );
    }
    
    static dtoToDomain(dto: StatusDto): Status{
        const tarefas: Array<Tarefa> = dto.tarefas.map(tarefaDto => TarefaMapper.dtoToDomain(tarefaDto));

        return new Status(
            dto.id,
            dto.status,
            tarefas
        );
    }
    
    static domainToDto(domain: Status): StatusDto{
        const tarefas: Array<TarefaDto> = domain.getTarefas.map(tarefa => TarefaMapper.domainToDto(tarefa));

        return new StatusDto(
            domain.getId,
            domain.getStatus,
            tarefas
        );
    }
}