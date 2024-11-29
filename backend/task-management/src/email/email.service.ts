import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

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
                text: `
                Olá,
    
                Clique no link para confirmar seu cadastro:
                http://127.0.0.1:3000/frontend/views/confirmado.html#token=${token}
                
                Atenciosamente,
                Equipe Quantum Squad`,
            })
        }catch(error){
            console.error("Erro no envio de email de confirmação: ", error);
            throw new HttpException("Erro ao cadastrar usuário", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
