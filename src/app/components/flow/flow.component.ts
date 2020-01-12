import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Stage } from '../../models/stage';
import { Flow } from '../../models/flow';
import { Step } from '../../models/step';
import * as utils from '../../utils/colorCodeGenerator';
import { FlowService } from '../../services/flow.service';
import { StageService } from '../../services/stage.service';

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

    constructor(public dragulaService: DragulaService,
      private router:Router,private _stageService:StageService,
      private activatedRoute:ActivatedRoute,private _flowService:FlowService) {
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
      this.enumerateStages();
      let id=this.activatedRoute.snapshot.params['id'];
      if(!id){
        this.router.navigate(['/flows'])
      }
      this.getFlowDetails(id);
      this.getTargetListOfStages();
    }


    private enumerateStages():void{
        this._stageService.enumerateStages()
        .subscribe(stagesListResponse=>{
          this.listOfStages=stagesListResponse;
          this.getTargetListOfStages();
        })
    }

    private getFlowDetails(argId:string):void{
        this._flowService.flowdetails(argId)
        .subscribe(flowDetailsResponse=>{
          this.selectedFlow=flowDetailsResponse;
          this.getTargetListOfStages();
        })
    }

    private getTargetListOfStages():void{
        let flowStageId=[];
        this.selectedFlow.stages.map(stage=>{
            flowStageId.push(stage._id);
        })
       let targetList=this.listOfStages.filter(stage=>{
            return flowStageId.indexOf(stage._id)===-1;
        })
        this.listOfStages=targetList;
    }
  
    public removeFlowStage(argIndex):void{
      this.listOfStages.push(this.selectedFlow.stages[argIndex]);
      this.selectedFlow.stages.splice(argIndex,1);
    }// public removeFlowStage(argIndex):void
  
    public saveFlow(): void {
      this._flowService.updateFlow(this.selectedFlow)
      .subscribe(flowResponse=>{
        alert(`Successfully saved ${this.selectedFlow.name}`);
      })
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
