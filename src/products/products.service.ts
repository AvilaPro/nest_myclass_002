import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from "./interfaces/product.interface";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const productos = await this.productModel.find();
    return productos;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
    const producto = await this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true});
    return producto;
  }

  async remove(id: string): Promise<Product> {
    const producto = await this.productModel.findByIdAndDelete(id);
    return producto
  }
}
