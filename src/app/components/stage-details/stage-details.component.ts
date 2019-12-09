import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Configservice } from '../../services/configuration.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Stage } from '../../models/stage';
import { Step } from '../../models/step';
import * as utils from '../../utils/colorCodeGenerator';

@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.scss']
})
export class StageDetailsComponent implements OnInit {
  @ViewChild('stagecontent',{static:true}) stageContent:any;
  public selectedStage:Stage;
  public listOfSteps:Step[];

    constructor(public dragulaService: DragulaService,public configurationService:Configservice,
      private router:Router,
      private activatedRoute:ActivatedRoute) {
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
      this.listOfSteps=this.configurationService.getSteps();
      let id=this.activatedRoute.snapshot.params['id'];
      this.selectedStage=this.configurationService.getStageDetails(id);
      if(!this.selectedStage){
        this.router.navigate(['/steps'])
      }
      this.getTargetListOfStages();
    }

    private getTargetListOfStages():void{
      let stageStepsIds=[];
      this.selectedStage.steps.map(step=>{
          stageStepsIds.push(step.id);
      })
     let targetList=this.listOfSteps.filter(step=>{
          return stageStepsIds.indexOf(step.id)===-1;
      })
      this.listOfSteps=targetList;
  }
  
    public removeStagesStep(argIndex):void{
      this.listOfSteps.push(this.selectedStage.steps[argIndex]);
      this.selectedStage.steps.splice(argIndex,1);
    }// public removeStagesStep(argIndex):void
  
    public saveStage(): void {
      this.configurationService.saveStage(this.selectedStage);
      alert(`Successfully saved ${this.selectedStage.name}`);
    }


    public getStageColor(argName:string):string{
       return utils.stringToColour(argName);
    }// public getStageColor(argName:string):string

}
