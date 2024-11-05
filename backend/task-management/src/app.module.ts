import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsuarioEntity } from './usuario/entity/usuario.entity';
import { EquipeEntity } from './equipe/entity/equipe.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEquipeEntity } from './usuario_equipe/entity/usu.eq.entity';
import { EquipeModule } from './equipe/equipe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "quantum",
      password: "quantum",
      database: "kanban",
      entities: [UsuarioEntity, EquipeEntity, UsuarioEquipeEntity],
      synchronize: true,
    }),
    UsuarioModule,
    EquipeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}