import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { UsuarioService } from './usuario.service';
import { EmailService } from 'src/email/email.service';
import { UsuarioController } from './usuario.controller';
import { JwtAuthGuard } from './guard';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    providers: [UsuarioService, EmailService, JwtAuthGuard, JwtService],
    controllers: [UsuarioController],
})
export class UsuarioModule { }