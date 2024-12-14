import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//11.14 importamos el guardian en el controller
import { UsersGuard } from "./users.guard";

//12.4.1 importar el decorador
import { Public } from "src/decorators";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //12.4.2 decorar el método o ruta como publica
  @Public()
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //11.4.2 decoramos la ruta como publica
  //10.1 Configurar la ruta login
  @Public()
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.usersService.login(email, password);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //11.15 decoro con el Guardian para requerir el jwt
  //En el capitulo 12 se comento la siguiente linea de codigo que implementaba el decorador del UseGuards, la cual comprobamos que no es necesario usar ya que todas las peticiones estan pasando a traves del UsersGuardian al ser configurado de forma global en el module de la aplicacion (app.module.ts)
  // @UseGuards(UsersGuard)
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
