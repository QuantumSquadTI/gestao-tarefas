import { UsuarioEntity } from "src/usuario/entity/usuario.entity"
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

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
}