import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @ManyToMany(() => EquipeEntity, equipes => equipes.usuarios)
    equipes: Array<EquipeEntity>
}