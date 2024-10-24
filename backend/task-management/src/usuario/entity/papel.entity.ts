import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

export enum Papeis{
    ADMINISTRADOR = 'Administrador',
    COLABORADOR = 'Colaborador'
}

@Entity()
export class PapelEntity{
    @PrimaryGeneratedColumn()
    idPapel: number;

    @Column({
        type: 'enum',
        enum: Papeis,
        default: Papeis.COLABORADOR
    })
    papel: Papeis;

    @OneToMany(() => UsuarioEntity, usuario => usuario.idPapel)
    usuario: Array<UsuarioEntity>;
}