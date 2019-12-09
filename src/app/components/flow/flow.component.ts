import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Configservice } from '../../services/configuration.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Stage } from '../../models/stage';
import { Flow } from '../../models/flow';
import { Step } from '../../models/step';
import * as utils from '../../utils/colorCodeGenerator';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @ViewChild('stagecontent',{static:true}) stageContent:any;
  public selectedFlow:Flow;
  public listOfStages:Stage[];
  public searchFlowStageName:string;
  public searchStageName:string;

    constructor(public dragulaService: DragulaService,public configurationService:Configservice,
      private router:Router,
      private activatedRoute:ActivatedRoute) {
        const bag: any = this.dragulaService.find('flows'); 
        if (bag !== undefined) { 
            this.dragulaService.destroy('flows');
        };
        this.dragulaService.createGroup('flows', {
          // copy: (el, source) => {
          //       return source.id === 'right';
          // },
          // copyItem: (step) => {
          //       return step;
          // },
          accepts: (el, target, source, sibling) => {
                return target.id !== 'right';
          }
        });
    }
  
    ngOnInit() {
      this.selectedFlow=null;
      this.searchFlowStageName='';
      this.searchStageName='';
      this.listOfStages=[];
      this.listOfStages=this.configurationService.getStages();
      let id=this.activatedRoute.snapshot.params['id'];
      this.selectedFlow=this.configurationService.getFlowDetails(id);
      if(!this.selectedFlow){
        this.router.navigate(['/steps'])
      }
      this.getTargetListOfStages();
    }

    private getTargetListOfStages():void{
        let flowStageId=[];
        this.selectedFlow.stages.map(stage=>{
            flowStageId.push(stage.id);
        })
       let targetList=this.listOfStages.filter(stage=>{
            return flowStageId.indexOf(stage.id)===-1;
        })
        this.listOfStages=targetList;
    }
  
    public removeFlowStage(argIndex):void{
      this.listOfStages.push(this.selectedFlow.stages[argIndex]);
      this.selectedFlow.stages.splice(argIndex,1);
    }// public removeFlowStage(argIndex):void
  
    public saveFlow(): void {
      this.configurationService.saveFlow(this.selectedFlow);
      alert(`Successfully saved ${this.selectedFlow.name}`);
    }

    public exportFlow(){
      let stages={};
      let stepsList:Step[]=[];
      let flowSteps={};
      for(let i=0;i<this.selectedFlow.stages.length;i++){
        stages[this.selectedFlow.stages[i].name]={};
        stepsList.push(...this.selectedFlow.stages[i].steps)
      }
      for(let i=0;i<stepsList.length;i++){
        flowSteps[stepsList[i].name]={};
        if(stepsList[i].actions.length>0){
          for(let action of stepsList[i].actions){
            let actionKey='';
            if(action.name!=='Default'){
              actionKey=action.name;
            }
              flowSteps[stepsList[i].name][actionKey]={};
              flowSteps[stepsList[i].name][actionKey]['texts']=action.message.texts;
              flowSteps[stepsList[i].name][actionKey]['isTemplate']=action.message.isTemplate;
          }   
        }
      }
      var theJSON = JSON.stringify(flowSteps,undefined,4);
      var url = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      const date=new Date();
      a.download = `${this.selectedFlow.name}-${date.getHours()}-${date.getMinutes()}-${date.getMinutes()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      console.log(flowSteps);
    }

    public getStageColor(argName:string):string{
      return utils.stringToColour(argName);
   }// public getStageColor(argName:string):string
}
