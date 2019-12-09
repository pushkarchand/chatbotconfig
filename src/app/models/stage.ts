import { Step } from './step';
import * as uuid from 'uuid';
export class Stage{
    constructor(public name:string,public steps:Step[],public id:string=uuid.v4()){}
}