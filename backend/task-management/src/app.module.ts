import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsuarioEntity } from './usuario/entity/usuario.entity';
import { PapelEntity } from './usuario/entity/papel.entity';
import { TarefaEntity } from './tarefa/entity/tarefa.entity';
import { Status } from './tarefa/domain/status.domain';
import { StatusEntity } from './tarefa/entity/status.entity';
import { EquipeEntity } from './equipe/entity/equipe.entity';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { EmailService } from './email/email.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "quantum",
      password: "quantum",
      database: "task",
      entities: [UsuarioEntity, PapelEntity, TarefaEntity, StatusEntity, EquipeEntity],
      synchronize: true
    }),
    UsuarioModule,
  ],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService, EmailService],
})
export class AppModule {}