import { EquipeEntity } from "src/equipe/entity/equipe.entity";
import { UsuarioEntity } from "src/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

export enum Funcao{
    ADMINISTRADOR = 'Administrador',
    COLABORADOR = 'Colaborador',
}

@Entity('usuario_equipe')
export class UsuarioEquipeEntity{
    @PrimaryColumn()
    idU: number;

    @PrimaryColumn()
    idE: number;

    @Column({
        name: 'funcao',
        type: 'enum',
        enum: Funcao,
        default: Funcao.ADMINISTRADOR,
    })
    funcao: Funcao;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.usuarioEquipes)
    @JoinColumn({name: 'idU'})
    usuario: UsuarioEntity;

    @ManyToOne(() => EquipeEntity, equipe => equipe.equipeUsuarios)
    @JoinColumn({name: 'idE'})
    equipe: EquipeEntity;

    constructor(
        idU: number,
        idE: number,
        funcao: Funcao
    ){
        this.idU = idU,
        this.idE = idE,
        this.funcao = funcao
    }
}