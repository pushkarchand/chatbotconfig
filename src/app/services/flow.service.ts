import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Flow } from '../models/flow';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  constructor(private http: HttpClient) {}

  public enumerateFlows():Observable<Flow[]>{
   return this.http.get<Flow[]>(environment.flow)
   .pipe(map(response=>{
        response.forEach(stage=>{
          delete stage['__v'];
        })
        return response;
      })
   )
  }// public enumerateFlows():Observable<Flow[]>

  public flowdetails(argId:string):Observable<Flow>{
    return this.http.get<Flow>(`${environment.flow}/${argId}`)
    .pipe(map(response=>{
        delete response['__v'];
         return response;
       })
    )
   }// public flowdetails(argId:string):Observable<Flow>

  public createFlow(argFlow:Flow):Observable<Flow>{
    return this.http.post<Flow>(environment.flow,argFlow)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public createFlow(argFlow:Flow):Observable<Flow>

  public updateFlow(argFlow:Flow):Observable<Flow>{
    return this.http.put<Flow>(environment.flow,argFlow)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public updateFlow(argFlow:Flow):Observable<Flow>

  public deleteFlow(argFlowId:string):Observable<Flow>{
    return this.http.delete<Flow>(`${environment.flow}/${argFlowId}`)
    .pipe(map(response=>{
         return response;
       })
    )
  }// public deleteFlow(argFlowId:string):Observable<Flow>
}
