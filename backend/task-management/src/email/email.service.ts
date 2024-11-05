import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

//Autenticação necessária para nós entrarmos na conta gmail
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    
)

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
        try{
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
        }catch(error){
            console.error("Erro no envio de email de confirmação: ", error);
            throw new HttpException("Erro ao cadastrar usuário", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
