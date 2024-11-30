import { Equipe } from "./domain/equipe.domain";
import { EquipeDto } from "./dto/equipe.dto";
import { EquipeEntity } from "./entity/equipe.entity";

export class EquipeMapper{
    static entityToDomain(entity: EquipeEntity): Equipe{

        return new Equipe(
            entity.idE,
            entity.nome,
            entity.descricao,
            entity.fotoEquipe,
        );
    }

    static domainToEntity(domain: Equipe): EquipeEntity{

        return new EquipeEntity(
            domain.getNome,
            domain.getDescricao,
            domain.getFotoEquipe,
        );
    }

    static dtoToDomain(dto: EquipeDto): Equipe{

        return new Equipe(
            dto.idE,
            dto.nome,
            dto.descricao,
            dto.fotoEquipe,
        );
    }

    static domainToDto(domain: Equipe): EquipeDto{

        return new EquipeDto(
            domain.getNome,
            domain.getDescricao,
            domain.getFotoEquipe,
            domain.getId,
        );
    }
}