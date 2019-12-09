import { Injectable } from "@angular/core";
import { Stage } from "../models/stage";
import { Step } from "../models/step";
import { Flow } from '../models/flow';

@Injectable({
  providedIn: "root"
})
export class Configservice {
  constructor() {}

  public getStages(): Stage[] {
    return JSON.parse(localStorage.getItem("stages"))||[];
  } // public getStages(): Stage[]

  public getSteps(): Step[] {
    return JSON.parse(localStorage.getItem("steps"))||[];
  } // public getSteps():Step[]

  public getFlows(): Flow[] {
    return JSON.parse(localStorage.getItem("flows"))||[];
  } // public getFlows():Step[]

  public getStepDetails(argStepId:string):Step{
    let listOfSteps:Step[] = JSON.parse(localStorage.getItem("steps")) || [];
    let stepDetails=listOfSteps.filter(step=>{
      return step.id===argStepId;
    })
    return stepDetails.length>0?stepDetails[0]:null;
  }// public getStepDetails(argStepId:string):Step


  public getStageDetails(argStageId:string):Stage{
    let listOfSteps:Stage[] = JSON.parse(localStorage.getItem("stages")) || [];
    let stageDetails=listOfSteps.filter(stage=>{
      return stage.id===argStageId;
    })
    return stageDetails.length>0?stageDetails[0]:null;
  }// public getStageDetails(argStageId:string):Stage


  public getFlowDetails(argFlowId:string):Flow{
    let listOfFlows:Flow[] = JSON.parse(localStorage.getItem("flows")) || [];
    let flowDetails=listOfFlows.filter(flow=>{
      return flow.id===argFlowId;
    })
    return flowDetails.length>0?flowDetails[0]:null;
  }// public getFlowDetails(argFlowId:string):Stage

  public createNewStage(argStage: Stage): any {
    let listOfStage = JSON.parse(localStorage.getItem("stages")) || [];
    listOfStage.push(argStage);
    localStorage.setItem("stages", JSON.stringify(listOfStage));
  }// public createNewStage(argStage: Stage): any

  

  public createNewStep(argStep): any {
    let listOfSteps = JSON.parse(localStorage.getItem("steps")) || [];
    listOfSteps.push(argStep);
    localStorage.setItem("steps", JSON.stringify(listOfSteps));
  }// public createNewStep(argStep): any


  public createNewflow(argFlow:Flow): any {
    let listOfFlows:Flow[] = JSON.parse(localStorage.getItem("flows")) || [];
    listOfFlows.push(argFlow);
    localStorage.setItem("flows", JSON.stringify(listOfFlows));
  }// public createNewflow(argFlow:Flow): any

  public saveStage(argStage:Stage): void {
    let listOfStage = JSON.parse(localStorage.getItem("stages")) || [];
    console.log(listOfStage);
    if(listOfStage.length>0){
      listOfStage=listOfStage.map(stage => {
            if(stage.id===argStage.id){
              stage={...argStage};
            }
            return stage;
        });
    }
    localStorage.setItem("stages", JSON.stringify(listOfStage));
  }// public saveStage(argStage): void


  public saveStep(argStep:Step): void {
    let listOfStep = JSON.parse(localStorage.getItem("steps")) || [];
    if(listOfStep.length>0){
      listOfStep=listOfStep.map(stage => {
            if(stage.id===argStep.id){
              stage={...argStep};
            }
            return stage;
        });
    }
    localStorage.setItem("steps", JSON.stringify(listOfStep));
  }// public saveStep(argStep): void



  public saveFlow(argFlow:Flow): void {
    let listOfFlows = JSON.parse(localStorage.getItem("flows")) || [];
    if(listOfFlows.length>0){
      listOfFlows=listOfFlows.map(flow => {
            if(flow.id===argFlow.id){
              flow={...argFlow};
            }
            return flow;
        });
    }
    localStorage.setItem("flows", JSON.stringify(listOfFlows));
  }// public saveStep(argStep): void

  public deleteStep(argIndex:number):void{
    let listOfStep = JSON.parse(localStorage.getItem("steps")) || [];
    listOfStep.splice(argIndex,1);
    localStorage.setItem("steps", JSON.stringify(listOfStep));
  }// public deleteStep(argIndex:number):void


  public deleteStage(argIndex:number):void{
    let listOfStages = JSON.parse(localStorage.getItem("stages")) || [];
    listOfStages.splice(argIndex,1);
    localStorage.setItem("stages", JSON.stringify(listOfStages));
  }// public deleteStage(argIndex:number):void

  public deleteFlow(argIndex:number):void{
    let listOfFlows = JSON.parse(localStorage.getItem("flows")) || [];
    listOfFlows.splice(argIndex,1);
    localStorage.setItem("flows", JSON.stringify(listOfFlows));
  }// public deleteStep(argIndex:number):void

}
