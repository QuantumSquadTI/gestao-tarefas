import { TarefaEntity } from "src/tarefa/entity/tarefa.entity"
import { UsuarioEntity } from "src/usuario/entity/usuario.entity"
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class EquipeEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    descricao: string

    @Column()
    fotoPerfil: string

    @ManyToMany(() => UsuarioEntity, usuario => usuario.equipes)
    usuarios: Array<UsuarioEntity>

    @OneToMany(() => TarefaEntity, tarefa => tarefa.equipe)
    tarefas: TarefaEntity
}