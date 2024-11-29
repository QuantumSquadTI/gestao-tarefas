import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipeEntity } from './entity/equipe.entity';
import { Repository } from 'typeorm';
import { UsuarioEquipeEntity } from 'src/usuario_equipe/entity/usu.eq.entity';
import { Funcao } from 'src/usuario_equipe/entity/usu.eq.entity'
import { Equipe } from './domain/equipe.domain';
import { EquipeMapper } from './equipe.mapper';
import { UsuarioService } from 'src/usuario/usuario.service';
import { console } from 'inspector';
import { EquipeDto } from './dto/equipe.dto';

@Injectable()
export class EquipeService {
    constructor(
        @InjectRepository(EquipeEntity)
        private readonly equipeRepository: Repository<EquipeEntity>,
        @InjectRepository(UsuarioEquipeEntity)
        private readonly usuEquRepository: Repository<UsuarioEquipeEntity>,
        private readonly usuarioService: UsuarioService
    ){}

    async isAdmistrador(idU: number){
        const membroVelho = await this.usuEquRepository.findOne({where: { idU }})
        if((await membroVelho).funcao !== Funcao.ADMINISTRADOR){
            throw new HttpException("Membro não é Administrador", HttpStatus.BAD_REQUEST)
        }
    }

    async criarEquipe(idU: number ,  equipe: Equipe ){
        console.log(equipe)
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

    async listarTodos(idU: number){
        const listaEquipesUsuarios = this.usuEquRepository.find({where: {idU: idU}})

        const listaEquipes: Array<EquipeEntity> = new Array();

        for (const linha of await listaEquipesUsuarios) {
            const equipe = await this.equipeRepository.findOne({ where: { idE: linha.idE } });
            if (equipe) {
                listaEquipes.push(equipe);
            }
        }

        const listaDominios: Equipe[] = listaEquipes.map(EquipeMapper.entityToDomain);
        const listaDtos: EquipeDto[] = listaDominios.map(EquipeMapper.domainToDto);

        return listaDtos
    }

    // async adicionarMembro(idE: number, idU: number, idMembroNovo: number){
    //     this.usuarioService.buscarPorId(idU)
    //     this.isAdmistrador(idU)
        
    //     const novoMembro = new UsuarioEquipeEntity(idMembroNovo, idE, Funcao.COLABORADOR)

    //     return await this.usuEquRepository.save(novoMembro)
    // }

    // async mudarFuncao(idE, dadosAlterados: {idU, idAlterado, funcao}){
    //     this.usuarioService.buscarPorId(dadosAlterados.idU)
    //     this.usuarioService.buscarPorId(dadosAlterados.idAlterado)
    //     this.isAdmistrador(dadosAlterados.idU)


    //     return this.usuEquRepository.update({idU: dadosAlterados.idAlterado, idE: idE}, {funcao: dadosAlterados.funcao})
    // }

    // async removerMembro(idE, dadosRemover){
    //     this.usuarioService.buscarPorId(dadosRemover.idU)
    //     this.usuarioService.buscarPorId(dadosRemover.idAlterado)
    //     this.isAdmistrador(dadosRemover.idU)

    //     this.usuEquRepository.delete({idE: idE, idU: dadosRemover.idAlterado})
    // }
}
