import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

//10.10 importar el modulo de JWT
import { JwtModule } from "@nestjs/jwt";

//11.2 importar las constantes de este recurso asociado que es jwtConstant
import { jwtConstant } from "./constants";

@Module({
  imports: [
    //9.1
    //Agregar el MongooseModule
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
    //10.11 configurar el servicio JWT
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '1h' },
      global: true
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
