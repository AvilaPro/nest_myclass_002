import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
//13.5.2 importar el decordar de Roles
import { Roles } from "src/decorators";
//13.5.3 importar el enum de los roles
import { Role } from "src/rol.enum";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //13.5.5 Decoramos la ruta de post que permite crear un producto para que solo un usuario con el rol admin pueda utilizar esta ruta del servidor
  @Roles(Role.Admin)
  @Post()
  async create(@Res() res, @Body() createProductDto: CreateProductDto) {
    const productoCreado = await this.productsService.create(createProductDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Producto creado con éxito',
      productoCreado
    })
  }

  //13.5.4 Decoramos con el decorador Roles a la ruta get de todo los produsctos y configuramos que todos los roles puedan tener acceso.
  @Roles(Role.Admin, Role.User)
  @Get()
  async findAll(@Res() res) {
    const productos = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Productos de la coleccion',
      productos
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put()
  async update(@Res() res, @Query('id') productId , @Body() updateProduct: CreateProductDto) {
    const product = await this.productsService.update(
      productId,
      updateProduct,
    );
    if (!product) {
      throw new NotFoundException('Producto por actualizar NO encontrado');
    }
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'Producto actualizado correctamente',
      product,
    });
  }

  @Delete()
  async remove(@Res() res,@Query('id') id: string) {
    const producto = await this.productsService.remove(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado para eliminar');
    }else{
      return res.status(HttpStatus.OK).json({
        message: 'Producto eliminado correctamente',
        producto
      })
    }
  } 
}
