import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEquipeEntity } from "src/usuario_equipe/entity/usu.eq.entity";

@Entity('usuario')
export class UsuarioEntity{
    
    @PrimaryGeneratedColumn()
    idU: number;

    @Column({type: 'varchar', length: 50})
    nome: string;

    @Column({type: 'varchar', length: 50})
    email: string;

    @Column({type: 'varchar', length: 255})
    senha: string;

    @Column({type: 'boolean', default: false})
    ativo: boolean;

    @OneToMany(() => UsuarioEquipeEntity, usuarioEquipe => usuarioEquipe.usuario)
    usuarioEquipes: UsuarioEquipeEntity[];

    constructor(
        nome: string,
        email: string,
        senha: string,
        ativo?: boolean
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }
}