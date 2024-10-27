import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

export enum Papeis{
    ADMINISTRADOR = 'Administrador',
    COLABORADOR = 'Colaborador'
}

@Entity()
export class PapelEntity{

    constructor(
        papel: Papeis = Papeis.COLABORADOR,
        usuario: Array<UsuarioEntity> = []
    ) {
        this.papel = papel;
        this.usuario = usuario;
    }

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