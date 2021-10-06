import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sensors } from '../models/sensor.interface';
import { DataPoint } from '../models/data-point.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  SENSORS_PATH = "/sensors"

  constructor(private http: HttpClient) {}

   getSensorsData(date: Date): Observable<Sensors[]> {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const URL:string = environment.BACKEND_URL + this.SENSORS_PATH + `/date/${year}/${month}/${day}`;
    return this.http.get<Sensors[]>(URL);
  }

  getSensorsPresentData(ref: string, date: Date): Observable<Sensors[]>{
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const URL:string = environment.BACKEND_URL + this.SENSORS_PATH + `/ref/${ref}/date/${year}/${month}/${day}`;

    return this.http.get<Sensors[]>(URL);
  }

  getPresentData(sensors: Sensors[]): DataPoint[] {
    // a problem here should be fixed
    // d.getHours() - 1
    return sensors.map(s => {const d = new Date(s.date) ;return {y: s.isPresent, label: `${d.getHours()-1}:${d.getMinutes()}`}})
  }

  getRefList(date: Date): Observable<string[]>{
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const URL:string = environment.BACKEND_URL + this.SENSORS_PATH + `/reflist/date/${year}/${month}/${day}`;
    console.log(URL)
    return this.http.get<string[]>(URL);
  }
}
