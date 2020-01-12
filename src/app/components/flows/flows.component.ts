import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Flow} from "../../models/flow";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { FlowService } from '../../services/flow.service';
@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {
  @ViewChild("flowContent", { static: false }) newFlow: any;
  public listOfflows: Flow[];
  public flowForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public _flowService: FlowService,
    private config: NgbModalConfig,
    private router: Router
  ) {
    this.config.backdrop = "static";
    this.config.keyboard = false;
  }

  ngOnInit() {
    this.listOfflows = [];
    this.enumerateFlows();
    this.initializeStepForm();
  }

  private enumerateFlows():void{
    this._flowService.enumerateFlows()
    .subscribe(flowListResponse=>{
      this.listOfflows=flowListResponse;
    })
  }

  private initializeStepForm() : void {
    this.flowForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required]))
    });
  }// private initializeStepForm(argStep:Step=null) : void


  public openAddNewFlow(): void {
    this.modalService.open(this.newFlow, { centered: true });
  } // public openAddNewFlow(content): void

  public addnewFlow(): void {
    let newFlow: Flow = new Flow(this.flowForm.value.name, []);
   this._flowService.createFlow(newFlow)
   .subscribe(flowResponse=>{
    this.modalService.dismissAll();
    this.initializeStepForm();
    this.enumerateFlows();
   })
  } // public addnewFlow(): void

  public deleteflow(argIndex:number):void{
    const confirmation=confirm(`Are you sure you want to delte ${this.listOfflows[argIndex].name}`);
    if(confirmation){
      let flowid=this.listOfflows[argIndex]._id;
     this._flowService.deleteFlow(flowid)
     .subscribe(flowResponse=>{
       this.enumerateFlows();
     })
    }
  }// public deleteflow(argIndex:number):void

  public editflow(argFlowId:string):void{
    this.router.navigate(['/flow/',argFlowId]);
  }// public editflow(argFlowId:string):void
}
