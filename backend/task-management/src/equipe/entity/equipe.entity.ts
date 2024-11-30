import { UsuarioEquipeEntity } from "src/usuario_equipe/entity/usu.eq.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('equipe')
export class EquipeEntity{

    @PrimaryGeneratedColumn()
    idE: number;

    @Column({type: 'varchar', length: 50})
    nome: string;

    @Column({type: 'varchar'})
    descricao: string;

    @Column({type: 'varchar', length: 255})
    fotoEquipe: string;

    @OneToMany(() => UsuarioEquipeEntity, usuarioEquipe => usuarioEquipe.equipe)
    equipeUsuarios: UsuarioEquipeEntity[];

    constructor(
        nome: string,
        descricao: string,
        fotoEquipe: string,
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.fotoEquipe = fotoEquipe;
    }
}