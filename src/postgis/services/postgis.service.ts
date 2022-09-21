import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {from, Observable } from 'rxjs';
import { DeleteResult, Repository,UpdateResult } from 'typeorm';
import { AddPoint } from '../models/post.entity';
import {Point} from 'geojson'

@Injectable()
export class PointService {
    constructor(
        @InjectRepository(AddPoint)
        private readonly AddPointRepository: Repository<AddPoint>
    ){}

    createPost(post:AddPoint): Observable<AddPoint>{
        return from(this.AddPointRepository.save(post));
    }

    findAllPosts():Observable<AddPoint[]>{
        return from(this.AddPointRepository.find());
    }

    
    
    }

    



