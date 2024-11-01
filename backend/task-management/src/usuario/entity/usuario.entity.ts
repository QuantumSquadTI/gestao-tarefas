import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PapelEntity } from "./papel.entity";
import { TarefaEntity } from "src/tarefa/entity/tarefa.entity";

@Entity()
export class UsuarioEntity{

    constructor(
        nome: string,
        email: string,
        senha: string,
        papel?: PapelEntity,
        equipes?: Array<EquipeEntity>,
        tarefas?: Array<TarefaEntity>,
        ativo?: boolean 
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.papel = papel;
        this.equipes = equipes || [];
        this.tarefas = tarefas || [];
        this.ativo = ativo;
    }
    
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @ManyToOne(() => PapelEntity, papeis => papeis.usuario)
    papel: PapelEntity;

    @ManyToMany(() => EquipeEntity, equipes => equipes.usuarios)
    @JoinTable()
    equipes: Array<EquipeEntity>;

    @ManyToMany(() => TarefaEntity, tarefas => tarefas.usuario)
    @JoinTable()
    tarefas: Array<TarefaEntity>;

    @Column()
    ativo: boolean;
}