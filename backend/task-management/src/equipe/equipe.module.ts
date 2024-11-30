import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeEntity } from './entity/equipe.entity';
import { EquipeController } from './equipe.controller';
import { EquipeService } from './equipe.service';
import { UsuarioEquipeEntity } from 'src/usuario_equipe/entity/usu.eq.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { EmailService } from 'src/email/email.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([EquipeEntity, UsuarioEquipeEntity, UsuarioEntity]),
    ],
    providers: [EquipeService, UsuarioService, EmailService],
    controllers: [EquipeController],
})
export class EquipeModule {}
