import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeEntity } from './entity/equipe.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([EquipeEntity]),
    ],
    providers: [],
    controllers: [],
})
export class EquipeModule {}
