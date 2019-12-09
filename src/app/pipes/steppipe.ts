import { Pipe, PipeTransform } from '@angular/core';
import { Step } from '../models/step';

@Pipe({name: 'stepfilter'})
export class StepFilterByNamePipe implements PipeTransform {
transform(stepsList: Step[], query: string): Step[] {
    if(!query){
        return stepsList;
    }
    return stepsList.filter(step=>{
        return step.name.toLocaleLowerCase().match(query.toLocaleLowerCase());
    })
  }
}