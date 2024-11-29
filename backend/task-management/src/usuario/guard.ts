import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service'; 

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new UnauthorizedException("Token não fornecido");
        }
        
        if (this.usuarioService.isTokenInvalido(token)) {
            throw new UnauthorizedException("Token inválido ou expirado");
        }
        try {
            
            this.jwtService.verify(token);
            return true;
        } catch (err) {
            throw new UnauthorizedException("Token inválido");
        }
    }
}