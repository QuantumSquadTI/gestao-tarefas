import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TarefaEntity } from "./tarefa.entity";

export enum TarefaStatus{
    PENDENTE = 'Pendente',
    EM_ANDAMENTO = 'Em Andamento',
    CONCLUIDO = 'Concluído'
}

@Entity()
export class StatusEntity{
    
    constructor(status: TarefaStatus = TarefaStatus.PENDENTE, tarefas: Array<TarefaEntity> = []) {
        this.status = status;
        this.tarefas = tarefas;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TarefaStatus,
        default: TarefaStatus.PENDENTE
    })
    status: TarefaStatus;

    @OneToMany(() => TarefaEntity, tarefa => tarefa.status)
    tarefas: Array<TarefaEntity>;
}