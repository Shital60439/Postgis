import { Point } from 'geojson';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('AddPoint')
export class AddPoint {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  lat: string;
  @Column()
  lon: string;

  @Column()
  City_Name: string;
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  geom: Point;
}

















