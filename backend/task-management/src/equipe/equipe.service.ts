import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipeEntity } from './entity/equipe.entity';
import { Repository } from 'typeorm';
import { UsuarioEquipeEntity } from 'src/usuario_equipe/entity/usu.eq.entity';
import { Funcao } from 'src/usuario_equipe/entity/usu.eq.entity'
import { Equipe } from './domain/equipe.domain';
import { EquipeMapper } from './equipe.mapper';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class EquipeService {
    constructor(
        @InjectRepository(EquipeEntity)
        private readonly equipeRepository: Repository<EquipeEntity>,
        @InjectRepository(UsuarioEquipeEntity)
        private readonly usuEquRepository: Repository<UsuarioEquipeEntity>,
        private readonly usuarioService: UsuarioService
    ){}

    async criarEquipe(idU: number ,  equipe: Equipe ){
        this.usuarioService.buscarPorId(idU);
        const [admins, count] = await this.usuEquRepository.findAndCount({where: {idU, funcao: Funcao.ADMINISTRADOR} });

        if (count >= 3){
            throw new HttpException("Não foi possivel criar usuário", HttpStatus.BAD_REQUEST);
        }

        
        
        const equipeCriada = await this.equipeRepository.save(EquipeMapper.domainToEntity(equipe));
        const usuario_equipe = new UsuarioEquipeEntity(idU, equipeCriada.idE, Funcao.ADMINISTRADOR)
        await this.usuEquRepository.save(usuario_equipe)

        return equipeCriada;
    }

    async adicionarMembro(idE: number, idU: number, idMembroNovo: number){
        const membroVelho = await this.usuEquRepository.findOne({where: { idU }})
        if((await membroVelho).funcao !== Funcao.ADMINISTRADOR){
            throw new HttpException("Membro não é Administrador", HttpStatus.BAD_REQUEST)
        }

        const novoMembro = new UsuarioEquipeEntity(idMembroNovo, idE, Funcao.COLABORADOR)

        return await this.usuEquRepository.save(novoMembro)
    }
}