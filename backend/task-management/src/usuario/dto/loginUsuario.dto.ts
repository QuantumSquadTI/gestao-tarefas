
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class loginUsuarioDto{
    

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    constructor(
        
        email: string,
        senha: string,
    
    ) {
        
        this.email = email;
        this.senha = senha;
       
    }
}