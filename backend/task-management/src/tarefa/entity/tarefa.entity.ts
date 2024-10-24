import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusEntity } from "./status.entity";
import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { UsuarioEntity } from "src/usuario/entity/usuario.entity";

@Entity()
export class TarefaEntity{

    @PrimaryGeneratedColumn()
    idTarefa: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    prazo: string;

    @ManyToOne(() => StatusEntity, status => status.tarefas)
    status: StatusEntity;

    @ManyToOne(() => EquipeEntity, equipe => equipe.tarefas)
    equipe: EquipeEntity;

    @ManyToMany(() => UsuarioEntity, usuario => usuario.tarefas)
    usuario: Array<UsuarioEntity>;
}