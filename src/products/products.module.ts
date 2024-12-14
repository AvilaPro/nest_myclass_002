import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./schemas/product.schema";
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
