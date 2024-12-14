import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
//13.2.1 creacion de roles guard y procedemos a importar los modulos que vamos a necesitar
//13.2.2 importacion del modulo Reflector
import { Reflector } from '@nestjs/core';
// 13.2.3 importacion del decorador de roles
import { ROLES_KEY } from "src/decorators";
//13.2.4 importacion del enum de los roles
import { Role } from "src/rol.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  //13.2.5 creacion del constructor de la clase
  constructor(
    //13.2.6 instanciacion del reflector
    private reflector: Reflector,
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    //13.2.7 Requerir los roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 13.2.8 si no se encuentra el decorador no se valida
    if(!requiredRoles) return true;

    //13.2.9 obtener el usuario
    const { user } = context.switchToHttp().getRequest();
    //13.2.10 verificar si el usuario tiene los roles requeridos
    const tieneRol = requiredRoles.some((role) => user.roles?.includes(role));

    if(!tieneRol) {
      throw new HttpException('No tiene el rol permitido', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }else{
      return tieneRol;
    }
  }
}
