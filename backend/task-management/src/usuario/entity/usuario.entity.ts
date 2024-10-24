import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PapelEntity } from "./papel.entity";
import { TarefaEntity } from "src/tarefa/entity/tarefa.entity";

@Entity()
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @ManyToOne(() => PapelEntity, papeis => papeis.usuario)
    idPapel: PapelEntity;

    @ManyToMany(() => EquipeEntity, equipes => equipes.usuarios)
    @JoinTable()
    equipes: Array<EquipeEntity>;

    @ManyToMany(() => TarefaEntity, tarefas => tarefas.usuario)
    @JoinTable()
    tarefas: Array<TarefaEntity>;
}