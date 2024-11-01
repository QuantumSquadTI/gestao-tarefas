import { Injectable } from '@nestjs/common';
import { authPlugins } from 'mysql2';
import * as nodemailer from 'nodemailer';
import { Subject } from 'rxjs';

@Injectable()
export class EmailService {
    private transportador = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'quantumsquadti@gmail.com',
            pass: '!Equipe123'
        }
    })

    async enviarEmailDeConfirmacao(para: string, token: string){
        const urlConfirmacao = `http://localhost:3000/confirmar-cadastro?token=${token}`; //qual link?
        await this.transportador.sendMail({
            from: "Quantum Squad quantumsquadti@gmail.com",
            para,
            subject: "Confirme seu cadastro",
            text: `Olá,

            Clique no link para confirmar seu cadastro:
            http://seusite.com/confirmar-cadastro?token=12345abcdef
            
            Atenciosamente,
            Equipe Quantum Squad`,
            html: `
                <p>Olá,</p>
                <p>Clique no link abaixo para confirmar seu cadastro:</p>
                <a href="http://seusite.com/confirmar-cadastro?token=12345abcdef">
                    Confirmar Cadastro
                </a>
                <br><br>
                <p>Atenciosamente,</p>
                <p>Equipe Quantum Squad</p>
            `
        })
    }
}
