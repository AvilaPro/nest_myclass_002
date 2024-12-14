//11.6 importar el manejador de excepciones de nest 'UnauthorizedException'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
//11.3 importacion de la clase Request de Express
import { Request } from 'express';
//11.8 importar el servicio de jwt
import { JwtService } from '@nestjs/jwt';
//11.11 importar las constantes del resoucer de User para acceder a la firma del jwt
import { jwtConstant } from "./constants";
//12.3.1 importar el decorador
import { IS_PUBLIC_KEY } from "../decorators";
//12.3.2 importar la clase Reflector desde nestjs/core
import { Reflector } from "@nestjs/core";


@Injectable()
export class UsersGuard implements CanActivate {
  //11.9 crear el constructor
  constructor(
    //11.10 instanciar el servicio de jwt
    private jwtService: JwtService,
    //12.3.3 instanciar a Reflector
    private reflector: Reflector,
  ) {}

  //11.4 Creacion del metodo que extrae el token del request
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //12.3.4 verificamos que la ruta tenga la marca Public, de lo contrario continua la validacion en este Guardian
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    //11.2 obtener el request de la peticion
    const request = context.switchToHttp().getRequest();
    //11.5 obtener el token de la peticion
    const token = this.extractTokenFromHeader(request);
    //11.7 creamos la condicional para que en caso de haber token se interrumpa la conexion
    if (!token) {
      throw new UnauthorizedException();
    }
    //11.12 si el token existe, entonces debemos descifrarlo
    //Usaremos el servicio de jwt para verificar que es valido.
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstant.secret,
      });
      //11.13 construyo la peticion con el user que se encuentra en el payload
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
