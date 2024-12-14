import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//9.2 InjectModel de la libreria de mongoose
import { InjectModel } from "@nestjs/mongoose";
//9.3 interface Model de mongoose
import { Model } from 'mongoose';
//9.4 interface de User
import { User } from "./interfaces/user.interface";
//9.9 importar los metodos de bcrypt
import * as bcrypt from 'bcrypt';
//10.5 importar el servicio de JWT
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  //9.5
  constructor(
    @InjectModel('User') private readonly userModel : Model<User>,
    //10.6 instanciar el servicio de JWT
    private jwtService: JwtService
  ) {
  }

  //9.6 Configurar el metodo de creacion de Usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    //9.7
    try {
      //9.10 encriptado de la contrasena
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      })
      return await newUser.save();
    } catch (error) {
      //9.8
      throw new HttpException('los datos suministrados no se ajustan al UserDTO', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  //10.2
  async login(email: string, password: string){
    //10.3 verificar que el usuario existe en la base de datos
    const user = await this.userModel.findOne({email});
    if (user) {
      // 10.4 verificar la contrasena
      const esValidaContrasena = await bcrypt.compare(password, user.password);
      if (esValidaContrasena) {
        //10.7 crear el payload
        const payload = { 
          email: user.email, 
          sub: user._id, 
          name: user.name,
          // 13.4.1 agregar pasar la informacion del role
          roles: user.role
        };
        //10.8 firmar el token
        return { access_token: await this.jwtService.signAsync(payload) };
      }else{
        throw new HttpException('contraseña invalida', HttpStatus.UNAUTHORIZED);
      }
    }else{
      throw new HttpException('usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
