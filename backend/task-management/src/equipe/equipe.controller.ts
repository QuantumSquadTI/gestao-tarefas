import { Body, Controller, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { Request } from 'express';
import { EquipeMapper } from './equipe.mapper';
import { EquipeDto } from './dto/equipe.dto';

@Controller('equipe')
export class EquipeController {
    constructor(
        private equipeService: EquipeService
    ){}

    @Post(":id")
    async criarEquipe(@Body() equipe: EquipeDto, @Param("id") idU: number, @Req() req: Request){
        //const idU = req.user.idU;
        const equipeCriada = await this.equipeService.criarEquipe(
            idU, EquipeMapper.dtoToDomain(equipe)
        )

        return {
            statusCode: HttpStatus.CREATED,
            message: "Equipe criada com sucesso",
            data: equipeCriada,
        };
    }

    @Post("add/:idE")
    async adicionarMembro(@Param("idE") idE: number, @Body("idU") idMembroNovo: number, @Req() req: Request) {
        const idU = req.user.idU;

        const membroSalvo = await this.equipeService.adicionarMembro(idE, idU, idMembroNovo)

        return {
            statusCode: HttpStatus.CREATED,
            message: "Membro adicionado com sucesso",
            data: membroSalvo,
        };
    }
    
}
