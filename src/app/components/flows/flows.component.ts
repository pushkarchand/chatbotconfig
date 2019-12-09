import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Flow} from "../../models/flow";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Configservice } from "src/app/services/configuration.service";
import { Router } from '@angular/router';
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
    public configurationService: Configservice,
    private config: NgbModalConfig,
    private router: Router
  ) {
    this.config.backdrop = "static";
    this.config.keyboard = false;
  }

  ngOnInit() {
    this.listOfflows = this.configurationService.getFlows();
    this.initializeStepForm();
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
    console.log(newFlow);
    this.configurationService.createNewflow(newFlow);
    this.listOfflows = this.configurationService.getFlows();
    this.modalService.dismissAll();
    this.initializeStepForm();
  } // public addnewFlow(): void

  public deleteflow(argIndex:number):void{
    const confirmation=confirm(`Are you sure you want to delte ${this.listOfflows[argIndex].name}`);
    if(confirmation){
      this.configurationService.deleteFlow(argIndex);
      this.listOfflows=this.configurationService.getFlows();
    }
  }// public deleteflow(argIndex:number):void

  public editflow(argFlowId:string):void{
    this.router.navigate(['/flow/',argFlowId]);
  }// public editflow(argFlowId:string):void
}
