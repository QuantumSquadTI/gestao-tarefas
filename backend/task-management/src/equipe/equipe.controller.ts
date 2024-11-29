import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { Request } from 'express';
import { EquipeMapper } from './equipe.mapper';
import { EquipeDto } from './dto/equipe.dto';

@Controller('equipe')
export class EquipeController {
    constructor(
        private equipeService: EquipeService
    ){}

    @Post(":idU")
    async criarEquipe(@Body() equipe: EquipeDto, @Param("idU") idU: number){
        console.log('oi');
        
        const equipeCriada = await this.equipeService.criarEquipe(
            idU, EquipeMapper.dtoToDomain(equipe)
        )

        return {
            statusCode: HttpStatus.CREATED,
            message: "Equipe criada com sucesso",
            data: equipeCriada,
        };
    }

    @Get(":idU")
    async listarTodos(){
        return {
            statusCode: HttpStatus.OK,
            message: "Mostrando todas as equipes"
        }
    }

    


    // @Post("add/:idE")
    // async adicionarMembro(@Param("idE") idE: number, @Body("idMembro") idMembroNovo: number, @Body("idU") idU: number, @Req() req: Request) {
    //     //const idU = req.user.idU;

    //     const membroSalvo = await this.equipeService.adicionarMembro(idE, idU, idMembroNovo)

    //     return {
    //         statusCode: HttpStatus.CREATED,
    //         message: "Membro adicionado com sucesso",
    //         data: membroSalvo,
    //     };
    // } 
    
    // @Put("update/:idE")
    // async mudarFuncao(@Param("idE") idE: number, @Body() dados: {idU, idAlterado, funcao}, @Req() req: Request){
    //     //const idU = req.user.idU;
    //     const membroAlterado = await this.equipeService.mudarFuncao(idE, dados)

    //     return {
    //         statuscode: HttpStatus.OK,
    //         message: "Função alterada com sucesso",
    //         data: membroAlterado
    //     }
    // }

    // @Delete("remove/:idE")
    // async removerMembro(@Param("idE") idE: number, @Body() dados: {idU, idAlterado}, @Req() req: Request){
    //     //const idU = req.user.idU;
    //     this.equipeService.removerMembro(idE, dados)
    // }

}
