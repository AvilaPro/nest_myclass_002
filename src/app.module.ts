import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { UsersGuard } from './users/users.guard';
import { RolesGuard } from './guards/roles/roles.guard';
//15.1.1 importar COnfigModule de @nestjs/config para poder acceder a las variables de entorno
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //15.1.2 habilitacion de ConfigModule
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //12.1.1
    {
      provide: 'APP_GUARD',
      useClass: UsersGuard
    },
    //13.5.1 configuracion del RolesGuard para toda la aplicacion
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
