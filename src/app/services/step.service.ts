import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Step } from '../models/step';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  constructor(private http: HttpClient) {}

  public enumerateSteps():Observable<Step[]>{
   return this.http.get<Step[]>(environment.step)
   .pipe(map(response=>{
        response.forEach(step=>{
          delete step['__v'];
        })
        return response;
      })
   )
  }// public enumerateSteps():Observable<Step[]>

  public stepDetails(argId:string):Observable<Step>{
    return this.http.get<Step>(`${environment.step}/${argId}`)
    .pipe(map(response=>{
        delete response['__v'];
         return response;
       })
    )
   }

  public createStep(argStep:Step):Observable<Step>{
    return this.http.post<Step>(environment.step,argStep)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public createStep(argStep:Step):Observable<Step>

  public updateStep(argStep:Step):Observable<Step>{
    return this.http.put<Step>(environment.step,argStep)
    .pipe(map(response=>{
         return response;
       })
    )
  }

  public deleteStep(argStepId:string):Observable<Step>{
    return this.http.delete<Step>(`${environment.step}/${argStepId}`)
    .pipe(map(response=>{
         return response;
       })
    )
  }

}
