import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { Request } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { EquipeMapper } from './equipe.mapper';
import { EquipeDto } from './dto/equipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('equipe')
export class EquipeController {
    constructor(
        private equipeService: EquipeService
    ){}

    @Post(":idU")
    @UseInterceptors(
        FileInterceptor('fotoEquipe', { 
          storage: diskStorage({
            destination: 'C:\\gestao-tarefas\\frontend\\assets\\image',
            filename: (req, file, callback) => {
              const fileExtension = path.extname(file.originalname);
              const fileName = `${Date.now()}${fileExtension}`;
              callback(null, fileName);
            },
          }),
        }),
      )
    async criarEquipe(@UploadedFile() file: Express.Multer.File, @Body() equipe: EquipeDto, @Param("idU") idU: number){
      
      if (!file) {
        throw new HttpException ('Imagem não enviada', HttpStatus.BAD_REQUEST);
      }

      const imageUrl = `frontend/assets/image/${file.filename}`;
      
      const equipeCriada = await this.equipeService.criarEquipe(
          idU, EquipeMapper.dtoToDomain({ ...equipe, fotoEquipe: imageUrl })
      )

      return {
          statusCode: HttpStatus.CREATED,
          message: "Equipe criada com sucesso",
          data: equipeCriada,
      };
    }

    @Get(":idU")
    async listarTodos(@Param("idU") idU: number){
      
      const response = await this.equipeService.listarTodos(idU);
      
      return {
          statusCode: HttpStatus.OK,
          message: "Mostrando todas as equipes",
          data: response
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
