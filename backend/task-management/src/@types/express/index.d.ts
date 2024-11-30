import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';

declare global {
  namespace Express {
    interface Request {
      user?: UsuarioEntity;
    }
  }
}