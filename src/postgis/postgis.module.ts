import { Module } from '@nestjs/common';

import { PointService } from './services/postgis.service';
import { PointController } from './controllers/postgis.controller';

import { TypeOrmModule } from '@nestjs/typeorm';


import { AddPoint } from './models/post.entity';
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports:[
        TypeOrmModule.forFeature([AddPoint]),
        MulterModule.register({ dest: './csv' }),
    ],
  providers: [PointService],
  controllers: [PointController]
})
export class postgisModule {}
