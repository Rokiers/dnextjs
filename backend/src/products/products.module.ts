import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],  
  //这里导出，是给别的模块，引入了这个products 谁就能使用这个service 中的内容
})
export class ProductsModule {}
