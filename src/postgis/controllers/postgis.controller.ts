 import { Body, Controller, Get, Injectable, Post,UploadedFile, UseInterceptors } from '@nestjs/common';
 import { InjectRepository } from '@nestjs/typeorm';
import {from, Observable } from 'rxjs';
import { parse } from 'papaparse';
import { DeleteResult, Repository,UpdateResult } from 'typeorm';
import { PointService } from '../services/postgis.service';
import { AddPoint } from '../models/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import {diskStorage} from 'multer'
import { readFileSync } from 'fs';
import { Point } from 'geojson';

@Controller('AddPoint')
export class PointController {
    AddPointRepository: any;
    fileQueue: any;
    serv: any;
    constructor(private PointService:PointService){}

    @Post()
    create(@Body()post: AddPoint): Observable <AddPoint>{
        return this.PointService.createPost(post)
    }

   
    @Get()
    findAll(): Observable<AddPoint[]>{
        return this.PointService.findAllPosts();
    }

    @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'csv',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile() {
    var dataObject = [];
    const csvFile = readFileSync('csv/1.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      //  transformHeader:(header)=> header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log('csv file', parsedCsv.data);
    dataObject = parsedCsv.data;
    dataObject.filter((element) => {
      var geom: Point = {
        type: 'Point',
        coordinates: [element.lon, element.lat],
      };
      console.log('objects', element);
      let entityObject = new AddPoint();
      entityObject.lat = element.lat;
      entityObject.lon = element.lon;
      entityObject.City_Name = element.City_Name;
      entityObject.geom = geom;
      console.log('entityObject', entityObject);
      return this.PointService.createPost(entityObject);
    });
  }


 }




