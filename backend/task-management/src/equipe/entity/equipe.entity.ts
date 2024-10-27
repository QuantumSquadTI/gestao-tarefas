import { TarefaEntity } from "src/tarefa/entity/tarefa.entity"
import { UsuarioEntity } from "src/usuario/entity/usuario.entity"
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class EquipeEntity{
    
    constructor(
        nome: string,
        descricao: string,
        fotoPerfil: string,
        usuarios: Array<UsuarioEntity> = [],
        tarefas: Array<TarefaEntity> = []
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.fotoPerfil = fotoPerfil;
        this.usuarios = usuarios;
        this.tarefas = tarefas;
    }

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
    tarefas: Array<TarefaEntity>
}