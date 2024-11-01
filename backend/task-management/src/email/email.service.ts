import { Injectable } from '@nestjs/common';
import { authPlugins } from 'mysql2';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transportador = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'quantumsquadti@gmail.com',
            pass: '!Equipe123'
        }
    })

    async emailConfirmarCadastro(para: string, token: string){
        const urlConfirmacao = `http://localhost:3000/confirmar-cadastro?token=${token}`;
        await this.transportador.sendMail({
            from: "Quantum Squad quantumsquadti@gmail.com",
            para,
            subject: "Confirme seu cadastro",
            text: `Olá,

            Clique no link para confirmar seu cadastro:
            ${urlConfirmacao}
            
            Atenciosamente,
            Equipe Quantum Squad`,
            html: `
                <p>Olá,</p>
                <p>Clique no link abaixo para confirmar seu cadastro:</p>
                <a href="${urlConfirmacao}>
                    Confirmar Cadastro
                </a>
                <br><br>
                <p>Atenciosamente,</p>
                <p>Equipe Quantum Squad</p>
            `
        })
    }
}
