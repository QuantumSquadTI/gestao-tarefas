import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeEntity } from './entity/equipe.entity';
import { EquipeController } from './equipe.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([EquipeEntity]),
    ],
    providers: [],
    controllers: [EquipeController],
})
export class EquipeModule {}
