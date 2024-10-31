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

    async enviarEmailDeConfirmacao(para: string, token: string){
        const urlConfirmacao = `http://localhost:3000/`; //qual link?

    }
}
