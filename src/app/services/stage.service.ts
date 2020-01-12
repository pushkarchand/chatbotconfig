import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stage } from '../models/stage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  constructor(private http: HttpClient) {}

  public enumerateStages():Observable<Stage[]>{
   return this.http.get<Stage[]>(environment.stage)
   .pipe(map(response=>{
        response.forEach(stage=>{
          delete stage['__v'];
        })
        return response;
      })
   )
  }// public enumerateStages():Observable<Step[]>

  public stagedetails(argId:string):Observable<Stage>{
    return this.http.get<Stage>(`${environment.stage}/${argId}`)
    .pipe(map(response=>{
        delete response['__v'];
         return response;
       })
    )
   }// public stagedetails(argId:string):Observable<Stage>

  public createStage(arrgStage:Stage):Observable<Stage>{
    return this.http.post<Stage>(environment.stage,arrgStage)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public createStage(argStage:Stage):Observable<Stage>

  public updateStage(argStage:Stage):Observable<Stage>{
    return this.http.put<Stage>(environment.stage,argStage)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public updateStage(argStage:Stage):Observable<Stage>

  public deleteStage(argStageId:string):Observable<Stage>{
    return this.http.delete<Stage>(`${environment.stage}/${argStageId}`)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public deleteStage(argStageId:string):Observable<Stage>
}
