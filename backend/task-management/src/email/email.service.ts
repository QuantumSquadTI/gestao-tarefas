import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    
)

@Injectable()
export class EmailService {
    
    private transportador = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'quantumsquadti@gmail.com',
            pass: 'h c f u l s y v s h u f q q m j'
        }
    })

    async emailConfirmarCadastro(para: string, token: string){
        try{
            await this.transportador.sendMail({
                from: "Quantum Squad quantumsquadti@gmail.com",
                to: para,
                subject: "Confirme seu cadastro",
                text: `Olá,
    
                Clique no link para confirmar seu cadastro:
                http://localhost:3000/usuario/confirmar-cadastro?token=${token}
                
                Atenciosamente,
                Equipe Quantum Squad`,
            })
        }catch(error){
            console.error("Erro no envio de email de confirmação: ", error);
            throw new HttpException("Erro ao cadastrar usuário", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
