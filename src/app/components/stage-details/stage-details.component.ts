import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Stage } from '../../models/stage';
import { Step } from '../../models/step';
import * as utils from '../../utils/colorCodeGenerator';
import { StepService } from '../../services/step.service';
import { StageService } from '../../services/stage.service';

@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.scss']
})
export class StageDetailsComponent implements OnInit {
  @ViewChild('stagecontent',{static:true}) stageContent:any;
  public selectedStage:Stage;
  public listOfSteps:Step[];

    constructor(public dragulaService: DragulaService,
      private router:Router,
      private activatedRoute:ActivatedRoute,private _stepService:StepService,
      private _stageService:StageService) {
        const bag: any = this.dragulaService.find('Steps'); 
      if (bag !== undefined) { 
        this.dragulaService.destroy('Steps');
        };
        this.dragulaService.createGroup('Steps', {
          // copy: (el, source) => {
          //       return source.id === 'rightSteps';
          // },
          // copyItem: (step) => {
          //       return step;
          // },
          accepts: (el, target, source, sibling) => {
                return target.id !== 'rightSteps';
          }
        });
    }
  
    ngOnInit() {
      this.selectedStage=null;
      this.listOfSteps=[];
      this.enumerateSteps();
      let id=this.activatedRoute.snapshot.params['id'];
      if(!id){
        this.router.navigate(['/stages'])
      }
      this.getStageDetails(id);
      this.getTargetListOfStages();
    }

    private getStageDetails(argId:string):void{
      this._stageService.stagedetails(argId)
      .subscribe(stageDetailsResponse=>{
        this.selectedStage=stageDetailsResponse;
        this.getTargetListOfStages();
      })
    }// private getStageDetails(argId:string):void

    private enumerateSteps():void{
        this._stepService.enumerateSteps()
        .subscribe(stepResponse=>{
          this.listOfSteps=stepResponse;
          this.getTargetListOfStages();
        })
    }// private enumerateSteps():void

    private getTargetListOfStages():void{
      let stageStepsIds=[];
      if(this.selectedStage){
          this.selectedStage.steps.map(step=>{
            stageStepsIds.push(step._id);
          })
          let targetList=this.listOfSteps.filter(step=>{
              return stageStepsIds.indexOf(step._id)===-1;
          })
          this.listOfSteps=targetList;
      }
  }// private getTargetListOfStages():void
  
    public removeStagesStep(argIndex):void{
      this.listOfSteps.push(this.selectedStage.steps[argIndex]);
      this.selectedStage.steps.splice(argIndex,1);
    }// public removeStagesStep(argIndex):void
  
    public saveStage(): void {
      this._stageService.updateStage(this.selectedStage)
      .subscribe(response=>{
        alert(`Successfully saved ${this.selectedStage.name}`);
      })
    }// public saveStage(): void 


    public getStageColor(argName:string):string{
       return utils.stringToColour(argName);
    }// public getStageColor(argName:string):string

}
